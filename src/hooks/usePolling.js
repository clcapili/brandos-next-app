import { useEffect, useRef, useState } from 'react'

function usePolling(
    asyncCallback,
    dependencies = [],
    interval = 5000,
    onCleanUp = () => {}
) {

    const timeout = useRef(null)
    const [dead, kill] = useState(false);
   
    useEffect(() => {
        if (dead) {
            return
        }

        let _stopped = false; 
        
        (async function pollingCallback() {
            try {
                await asyncCallback()
            } finally {
                // Set timeout after it finished, unless stopped
                timeout.current = !_stopped && setTimeout(
                    pollingCallback,
                    interval
                )
            }
        })()

        // Clean up if dependencies change
        return () => {
            console.log('cleanup');
            _stopped = true;
            clearInterval(timeout.current);
            onCleanUp();
        }

    }, [...dependencies, dead])

    return [() => kill(true), () => kill(false)]
}

export default usePolling;
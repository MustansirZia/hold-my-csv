import { useCallback, useRef } from 'react';

function useDebouce<T>(callback: (arg: T) => void, millis: number): (arg: T) => void {
    const timeout = useRef<number>();
    const f = useCallback(
        (arg: T) => {
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
            timeout.current = setTimeout(
                function (arg: T) {
                    callback(arg);
                },
                millis,
                arg,
            );
        },
        [callback, millis],
    );
    return f;
}

export default useDebouce;

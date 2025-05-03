import type { route as routeFn } from 'ziggy-js';

declare global {
    const route: typeof routeFn;
    interface Window {
        snap: {
            pay: (
                token: string,
                options?: {
                    onSuccess?: () => void;
                    onPending?: () => void;
                    onError?: () => void;
                    onClose?: () => void;
                }
            ) => void;
        };
    }
}

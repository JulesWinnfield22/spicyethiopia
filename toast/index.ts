import { useToast } from "./store/toast";

export function addToast(toast: any) {
  const { addToast: AT } = useToast();
  AT(toast);
}

export function removeToast(id: string) {
  const { removeToast: RT } = useToast();
  RT(id);
}

export { default } from "./toast";

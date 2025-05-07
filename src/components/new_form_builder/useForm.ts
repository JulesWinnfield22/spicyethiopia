import { ref, provide, nextTick, reactive, watch } from "vue";

export function useForm(id: string, inner = true, childrenName?: string) {
  if (!inner) return {};

  if (!id) {
    throw new Error("[id] is required");
  }

  const formEl = ref();
  const validateAll = ref(false);
  const valid = ref(false);
  const reset = ref(false);

  provide("validateAll", validateAll);
  provide("reset", reset);
  provide("id", id);

  function resetValue() {
    reset.value = true;
    nextTick(() => {
      reset.value = false;
      valid.value = false;
    });
  }

  function submit(fun = (f: any) => f) {
    validateAll.value = true;
    nextTick(() => {
      validateAll.value = false;

      let inputs: NodeListOf<HTMLElement> | null;
      let formFromId;
      if (!formEl.value && id) {
        formFromId = document.querySelector(`#${id}`);
        inputs =
          formFromId &&
          formFromId.querySelectorAll(
            childrenName ? `.${childrenName}` : ".custom-input"
          );
      } else if (formEl) {
        inputs = formEl.value.querySelectorAll(
          childrenName ? `.${childrenName}` : ".custom-input"
        );
      } else {
        throw new Error("no form found");
      }

      if (!inputs || !(inputs instanceof NodeList)) return false;

      const allValid = [...inputs].every(
        (el: HTMLElement) => el.dataset["valid"] == "true"
      );

      if (!allValid) return;
      valid.value = true;
      let values = [...inputs].reduce(
        (state: { [key: string]: any }, el: any) => {
          let name: string = el?.getAttribute?.("name") || "name";
          let skip = el.getAttribute("data-skip")
          console.log(name, el.dataset["val"], skip);
          if (el.getAttribute('type') == "file" && el != null && name != undefined) {
            console.log(el.val);
            
            state[name] = el.val || null;
          } else if(!skip) {

            state[el.getAttribute("name") ?? "name"] =
              JSON.parse(el.dataset["val"])?.value || null;
          }
          return state;
        },
        {}
      );

      fun({ values, reset: resetValue });
    });
  }

  return { submit, id, formEl, valid, reset: resetValue };
}

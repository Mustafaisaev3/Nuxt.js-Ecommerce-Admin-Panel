 
export function useClickOutside (targetElement, callbackFunction) {
    if (!targetElement) return

    const listener = (e) => {
        if(e.target == targetElement.value || e.composedPath().includes(targetElement.value)) {
            return
        }

        if(typeof callbackFunction === 'function') {
            callbackFunction()
        }
    }

    onMounted(() => {
        window.addEventListener('click', listener)
    })

    onBeforeMount(() => {
        window.removeEventListener('click', listener)
    })

    return {
        listener
    }
}
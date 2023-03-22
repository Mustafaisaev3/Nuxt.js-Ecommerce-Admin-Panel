export function useClickOutside (targetElement, callbackFunction) {
 
    if (!targetElement) return

    const listener = (e) => {
        e.stopPropagation()
        if(e.target == targetElement.value || e.composedPath().includes(targetElement.value)) {
            return
        }

        if(typeof callbackFunction === 'function') {
            callbackFunction()
        }
    }

    onMounted(() => {
        // if(modalListenContainer) {
        //     modalListenContainer.value.addEventListener('click', listener)
        // } else {
        //     window.addEventListener('click', listener)
        // }
        window.addEventListener('click', listener)
    })

    onBeforeUnmount(() => {
        // if(modalListenContainer) {
        //     modalListenContainer.value.removeEventListener('click', listener)
        // } else {
        //     window.removeEventListener('click', listener)
        // }
        window.removeEventListener('click', listener)
    })    

    return {
        listener
    }
}
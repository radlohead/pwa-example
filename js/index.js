if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../serviceWorker.js').then(function() {
        console.log('Service Worker Registered')
    })
}

const addBtn = document.querySelector('.add-button')
addBtn.style.display = 'none'

let deferredPrompt
window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault()
    deferredPrompt = e
    addBtn.style.display = 'block'

    addBtn.addEventListener('click', e => {
        addBtn.style.display = 'none'
        deferredPrompt.prompt()
        deferredPrompt.userChoice.then(choiceResult => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt')
            } else {
                console.log('User dismissed the A2HS prompt')
            }
            deferredPrompt = null
        })
    })
})

window.addEventListener('appinstalled', () => {
    console.log('app installed')
})

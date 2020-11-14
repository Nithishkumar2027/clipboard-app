const { clipboard } = require('electron')
const Vue = require('vue/dist/vue.js')

const App = new Vue({
    el: '#app',
    data: {
        title: 'Clipboard elephant 🐘',
        history: []
    },
    mounted() {
        setInterval(this.checkClipboard, 500)
    },
    methods: {
        checkClipboard() {
            const text = clipboard.readText()
            if (this.history[this.history.length - 1] !== text) {
                this.history.push(text)
            }
        }
    }
})
const moment = require('moment')
const { clipboard } = require('electron')
const Vue = require('vue/dist/vue.js')

const App = new Vue({
    el: '#app',
    data: {
        title: 'Clipboard elephant 🐘',
        history: []
    },
    mounted() {
        this.history.push({
            text: clipboard.readText(),
            clippedAt: moment().format('MMM Do YYYY, h:mm:ss a')
        })
        setInterval(this.checkClipboard, 500)
    },
    computed: {
        reversedHistory() {
            return this.history.slice().reverse()
        }
    },
    methods: {
        checkClipboard() {
            const text = clipboard.readText()
            if (this.history[this.history.length - 1].text !== text) {
                this.history.push({
                    text,
                    clippedAt: moment().format('MMM Do YYYY, h:mm:ss a')
                })
            }
        },
        itemClicked(item) {
            clipboard.writeText(item);
        }
    }
})
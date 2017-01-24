const Vue = require('vue')
const VueRouter = require('vue-router')
Vue.use(VueRouter)
 
module.exports = function(context){

    const Home = { template: '<div>home</div>' }
    const Foo = { template: '<div>foo</div>' }
    const Bar = { template: '<div>bar</div>' }

    const router = new VueRouter({
      mode: 'history',
      routes: [
        { path: '/', component: Home },
        { path: '/foo', component: Foo },
        { path: '/bar', component: Bar }
      ]
    })

    router.push(context.url)


    return Promise.resolve(
        new Vue({
            router: router,
            template: `
                    <div id="app">
                        <h1>Basic</h1>
                        <ul>
                            <li><router-link to="/">/</router-link></li>
                            <li><router-link to="/foo">/foo</router-link></li>
                        </ul>
                        <div>You have been here for {{ counter }} seconds.</div>
                        <router-view></router-view>
                    </div>
                    `,
            data: {
                counter: 0
            },
            created: function () {
                var vm = this
                setInterval(function () {
                    vm.counter += 1
                }, 1000)
            }
        })
    )
}
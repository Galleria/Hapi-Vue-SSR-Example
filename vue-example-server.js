const Vue = require('vue')
const VueRouter = require('vue-router')
Vue.use(VueRouter)
const axios = require('axios')
 
module.exports = function(context){

     const fetchUser = function() {
            return axios.get('http://localhost:8083/user/server')
                .then(function (response) {
                    console.log('response'+response.data)
                    return response.data
                })
                .catch(function (error) {
                    console.log('error')
                    return 'error'
                })
        }


    const Home = { template: '<div>home</div>' }
    const Foo = { template: '<div>foo</div>' }
    const Bar = { template: '<div>bar{{test}}</div>',
                    data : function(){
                        return {}
                    },
                    computed: {
                        test(){
                            return 'abs'
                        }
                    },
                    created : function(){
                            var vm = this
                            console.log('this.test ', vm.test )
                            fetchUser().then((currentUser) => {
                               console.log('CCC ', currentUser )
                               vm.test = currentUser
                            }, (err) => {
                                console.error('err')
                            })
                            console.log('this.test ', vm.test )
                    }
    }

    const router = new VueRouter({
      mode: 'history',
      routes: [
        { path: '/', component: Home },
        { path: '/foo', component: Foo },
        { path: '/bar', component: Bar }
      ]
    })

    router.push(context.url)
    //Object.assign(store, context.store)

    return Promise.resolve(
        new Vue({
            router: router,
            template: `
                    <div id="app">
                        <h1>Basic</h1>
                        <ul>
                            <li><router-link to="/">/</router-link></li>
                            <li><router-link to="/foo">/foo</router-link></li>
                            <li><router-link to="/bar">/bar</router-link></li>
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


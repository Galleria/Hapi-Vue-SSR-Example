(function () { 'use strict'
    var createApp = function (context) {

    const Home = { template: '<div>home</div>' }
    const Foo = { template: '<div>foo</div>' }
    const Bar = { template: '<div>bar {{test}}</div>', 
    data : function(){
      return {
        test : ''
      }
    },
                  created : function(){
                    var vm = this
                    axios.get('/user/client')
                      .then(function (response) {
                        console.log(response);
                        vm.test = response.data
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
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

    Vue.use(VueRouter)
  
    return new Vue({
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
    
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = createApp
  } else {
        this.app = createApp()
  }
}).call(this)

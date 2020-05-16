import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '../components/HelloWorld';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('./components/home/index')
    },
    {
      path: '/:category(ui|tools|core)',

      name: 'category',
      redirect: (route) => {
        console.log(route);
        return `/${route.params.category}/guides`;
      },
      component: () => import('./components/menu/index'),
      children: [
        {
          name: 'guides',
          path: 'guides',
          meta: {
            type: 'guide'
          },
          component: () => import('./components/component/base'),
          children: [
            {
              name: 'guides-docs',
              path: ':doc',
              meta: {
                type: 'guide'
              },
              component: () => import('./components/component/guide'),
              children: [
                {
                  path: ':pos',
                  name: 'guides-docs-hash',
                  meta: {
                    type: 'guide'
                  },
                  component: () => import('./components/component/guide')
                }
              ]
            }
          ]
        },
        {
          name: 'api',
          path: 'api',
          meta: {
            type: 'api'
          },
          component: () => import('./components/component/base'),
          children: [
            {
              name: 'api-docs',
              path: ':doc',
              meta: {
                type: 'api'
              },
              component: () => import('./components/component/api')
            }
          ]
        },
        {
          name: 'examples',
          path: 'examples',
          meta: {
            type: 'example'
          },
          component: () => import('./components/component/base'),
          children: [
            {
              name: 'examples-docs',
              path: ':doc',
              meta: {
                type: 'example'
              },
              component: () => import('./components/component/example')
            }
          ]
        }
      ]
    }
    // {
    //   path: '/guides',
    //   name: 'guide',
    //   component: () => import('./components/menu/index'),
    //   children: [
    //     {
    //       path: ':component',
    //       name: 'guide-component',
    //       component: () => import('./components/component/guide')
    //     }
    //   ]
    // },
    // {
    //   path: '/api',
    //   name: 'api',
    //   component: () => import('./components/menu/index')
    // },
    // {
    //   path: '/example',
    //   name: 'example',
    //   component: () => import('./components/menu/index')
    // },
    // {
    //   name: 'type-route',
    //   path: '/:type',
    //   redirect: (data) => {
    //     return `${data.params.type}/guides`;
    //   },
    //   component: () => import('./components/type/index'),
    //   children: [
    //     {
    //       path: 'example',
    //       name: 'example-route',
    //       component: () => import('./components/component/index')
    //     },
    //     {
    //       path: 'guides',
    //       name: 'guides-route',
    //       component: () => import('./components/component/index')
    //     },
    //     {
    //       path: 'api',
    //       name: 'doc-route',
    //       component: () => import('./components/component/index'),
    //       children: [
    //         {
    //           path: ':component',
    //           name: 'api-component',
    //           component: () => import('./components/api/index')
    //         }
    //       ]
    //     },
    //     {
    //       path: '*',
    //       redirect: {
    //         name: 'type-route',
    //         params: {
    //           type: 'ui'
    //         }
    //       }
    //     }
    //   ]
    // },
    // {
    //   path: '*',
    //   redirect: {
    //     name: 'category',
    //     params: {
    //       category: 'tools'
    //     }
    //   }
    // }

  ]
});

import Vue from 'vue'
import Router from 'vue-router'
//home page
import Home from '../components/homepage/home'
import Login from '../components/homepage/login'
import Register from '../components/homepage/register'
import RegisterInfo from '../components/homepage/registerInfo'
import PwRecovery from '../components/homepage/pwRecovery'
import PwReset from '../components/homepage/pwReset'
// adminInterface
import AdminInterface from  '../components/adminInterface/adminInterface'
import AccountMge from '../components/adminInterface/accountMge'
import ElderAgencyMge from '../components/adminInterface/elderAgencyMge'
import ElderManage from '../components/adminInterface/elderManage'
import ExpenseMge from '../components/adminInterface/expenseMge'
import MessageMge from '../components/adminInterface/messageMge'
import PwModify from '../components/adminInterface/pwModify'
import CareMenuMge from '../components/adminInterface/careMenuMge'
import CareActiveMge from '../components/adminInterface/careActiveMge'
import CarePhotoMge from '../components/adminInterface/carePhotoMge'
import ElderAgencyMges from '../components/adminInterface/elderAgencyMges'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children : [
        { path : '/',               name : 'Login',           component : Login           },
        { path : '/register',       name : 'Register',        component : Register        },
        { path : '/registerInfo',   name : 'RegisterInfo',    component : RegisterInfo    },
        { path : '/pwRecovery',     name : 'PwRecovery',      component : PwRecovery      },
        { path : '/pwReset',        name : 'PwReset',         component : PwReset         }
      ]
    },
    {
      path : '/adminInterface',
      name : 'AdminInterface',
      component : AdminInterface,
      children : [
        { path : 'elderManage',     name : 'ElderManage',     component : ElderManage     },
        { path : 'accountMge',      name : 'AccountMge',      component : AccountMge      },
        { path : 'elderAgencyMges', name : 'ElderAgencyMges', component : ElderAgencyMges },
        { path : 'elderAgencyMge',  name : 'ElderAgencyMge',  component : ElderAgencyMge  },
        { path : 'expenseMge',      name : 'ExpenseMge',      component : ExpenseMge      },
        { path : 'messageMge',      name : 'MessageMge',      component : MessageMge      },
        { path : 'pwModify',        name : 'PwModify',        component : PwModify        },
        { path : 'careMenuMge',     name : 'CareMenuMge',     component : CareMenuMge     },
        { path : 'careActiveMge',   name : 'CareActiveMge',   component : CareActiveMge   },
        { path : 'carePhotoMge',    name : 'CarePhotoMge',    component : CarePhotoMge    }
      ]
    }
  ]
})

import Vue from 'vue'
import App from './App.vue'
import {
  Button,
  Radio,
  Container,
  Main,
  Header,
  Aside,
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Card,
  Table,
  TableColumn,
  Tag,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Switch,
  DatePicker,
  Dialog,
  Pagination,
  MessageBox,
  Message
} from 'element-ui'; 
import 'element-ui/lib/theme-chalk/index.css';  //引入element样式组件
import './assets/less/index.less';
import '../api/mock.js';

import router from '../router';
import store from '../store';
import http from 'axios';


Vue.use(Button);       //对ElementUI进行按需引入
Vue.use(Radio);
Vue.use(Container);
Vue.use(Main);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Submenu);
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Tag);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Switch);
Vue.use(DatePicker);
Vue.use(Dialog);
Vue.use(Pagination);

//路由监听
router.beforeEach((to, from, next) => {
  store.commit('getToken');      //缓存，防止刷新页面后token失效
  const token = store.state.user.token;
  if(!token && (to.name !== 'login')){
    next({ name: 'login'});
  }
   else if (token && to.name === 'login'){
    next({ name: 'home' })
  }
  else{
    next();
  }
})

Vue.prototype.$http = http;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;


Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
  created(){
    store.commit('addMenu', router)
  }
}).$mount('#app')

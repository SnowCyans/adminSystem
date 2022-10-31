import PageTool from './PageTool/index.vue'
import UploadImage from './UploadImage'
import Fullscreen from './Fullscreen/index.vue'
import TagsView from './TagsView'

export default {
  install (Vue) {
    // 插件的本质就是一个普通的对象 只不过必须有个固定的方法叫install
    Vue.component('UploadImage', UploadImage)
    Vue.component('PageTool', PageTool)
    Vue.component('Fullscreen', Fullscreen)
    Vue.component('TagsView', TagsView)
  }
}

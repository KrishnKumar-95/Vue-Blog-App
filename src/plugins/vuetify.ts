import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/dist/vuetify.min.css'; // Import Vuetify CSS
// import '@mdi/font/css/materialdesignicons.min.css'; // Import Material Design Icons CSS

export default createVuetify({
    // Vuetify options and configurations
    // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
    components,
    directives,
    ssr: true,
});

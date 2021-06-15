import { wrapFunctional } from './utils'

export { default as Navigation } from '../../components/Navigation.vue'

export const LazyNavigation = import('../../components/Navigation.vue' /* webpackChunkName: "components/navigation" */).then(c => wrapFunctional(c.default || c))

import { createForm } from 'rc-form'
export default () => WrappedComponent => {
  const WrappedForm = createForm()(WrappedComponent)
  return WrappedForm
}

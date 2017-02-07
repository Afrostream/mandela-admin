import React, { Component, PropTypes } from 'react'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { extractImg } from '../core/utils'

import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Card } from 'antd'
const FormItem = Form.Item

@connect(({Search}) => ({Search}))
class HitScreen extends Component {

  getInitialState () {
    return {
      passwordDirty: false,
    }
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  handlePasswordBlur (e) {
    const value = e.target.value
    this.setState({passwordDirty: this.state.passwordDirty || !!value})
  }

  checkPassword (rule, value, callback) {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  }

  checkConfirm (rule, value, callback) {
    const form = this.props.form
    if (value && this.state.passwordDirty) {
      form.validateFields(['confirm'], {force: true})
    }
    callback()
  }

  render () {
    const {props:{Search, data}} = this
    const {getFieldDecorator} = this.props.form


    const image = extractImg({data, fit: 'crop', keys: ['thumb', 'poster', 'image'], width: 240, height: 120})

    return (
      <div className="pane-container hitScreen">
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            label="Title"
          >
            <Input defaultValue={data.get('title')}/>
          </FormItem>
          <FormItem
            label="Synopsis"
          >
            <Input type="textarea" defaultValue={data.get('synopsis') || data.get('body')}
                   autosize={{minRows: 10, maxRows: 50}}/>
          </FormItem>
          <FormItem >
            <Button type="primary" htmlType="submit" size="large">Save</Button>
          </FormItem>
        </Form>
      </div>
    )
  }

}

HitScreen.propTypes = {
  data: PropTypes.instanceOf(Immutable.Map)
}

HitScreen.defaultProps = {}

export default withRouter(Form.create()(HitScreen))

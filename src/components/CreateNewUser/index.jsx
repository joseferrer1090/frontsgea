import React,{PureComponent} from 'react';
import { Form, Icon, Input, Button } from 'antd';
import styles from './index.module.less';

const FormItem = Form.Item;


export default class HorizontalLoginForm extends PureComponent {
    constructor(props) {
        super(props);
    }

  handleSubmit(e) {
    e.preventDefault();
    //--
  }
  render() {

    return (
      <div className={styles.midle}>
      <Form inline  onSubmit={this.handleSubmit}>
        <FormItem>

            <Input addonBefore={<Icon type="user" />} placeholder="Username" />

        </FormItem>
        <FormItem>

            <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" />

        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">Crear</Button>
        </FormItem>
      </Form>
    </div>
    )
    }
}

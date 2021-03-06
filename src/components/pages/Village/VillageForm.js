import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
// import axios from 'axios';
import { axiosWithAuth } from '../../../utils/axiosWithAuth';

import { Form, Input } from 'antd';

import { editVillage } from '../../../state/actions';
import {
  layout,
  FormContainer,
  tailLayout,
  Required,
} from '../../common/FormStyle';
import Button from '../../common/Button';

const baseURL = 'https://cors-anywhere.herokuapp.com/http://54.158.134.245/api';

//! use real name when full server is developed
const initialState = {
  headmaster: 'Mr Headmaster',
  headmasters: [],
  schools: [],
  village_contact_name: '',
  village_contact_phone: '',
  villageContactEmail: '',
  educationContactName: '',
  educationContactEmail: '',
  educationContactPhone: '',
  notes: '',
};

const VillageForm = props => {
  const [formData, setFormData] = useState(initialState);
  const pathname = useHistory().location.pathname;
  const history = useHistory();
  const params = useParams().villageId;
  const [form] = Form.useForm();

  useEffect(() => {
    // Form will populate only if the URL includes "edit"
    if (pathname.includes('edit')) {
      axiosWithAuth()
        .get(`village/${params}`)
        .then(res => {
          // console.log(res);
          form.setFieldsValue(res.data);
          setFormData(res.data);
        })
        .catch(err => console.dir(err));
    }
  }, [form, params, pathname]);

  const handleSubmit = async () => {
    // console.log(formData);
    props.editVillage(params, formData);
    history.push('/school-village');
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <FormContainer>
      <Form.Item {...tailLayout}>
        <Link to="/school-village">Go Back to Village Profile</Link>
      </Form.Item>
      <Form onFinish={handleSubmit} form={form} {...layout}>
        <Form.Item
          label="Headmaster"
          name="headmaster"
          rules={[{ required: true, message: 'Headmaster name is required.' }]}
        >
          <Input
            type="text"
            name="headmaster"
            defaultValue="Mr Headmaster"
            value={formData.headmaster}
            onChange={e => handleChange(e)}
          />
        </Form.Item>

        <Form.Item
          label="Village Contact Name"
          name="village_contact_name"
          rules={[
            { required: true, message: ' Village Contact Name is required.' },
          ]}
        >
          <Input
            type="text"
            name="village_contact_name"
            value={formData.village_contact_name}
            onChange={e => handleChange(e)}
          />
        </Form.Item>

        <Form.Item
          label="Village Contact Phone"
          name="village_contact_phone"
          rules={[
            { required: true, message: 'Village Contact Phone is required.' },
          ]}
        >
          <Input
            type="text"
            name="village_contact_phone"
            value={formData.village_contact_phone}
            onChange={e => handleChange(e)}
          />
        </Form.Item>

        <Form.Item
          label="Education Contact Name"
          name="educationContactName"
          rules={[
            { required: true, message: 'Education Contact Name is required.' },
          ]}
        >
          <Input
            type="text"
            name="educationContactName"
            value={formData.educationContactName}
            onChange={e => handleChange(e)}
          />
        </Form.Item>

        <Form.Item
          label="Education Contact Phone"
          name="educationContactPhone"
          rules={[
            { required: true, message: 'Education Contact Phone is required.' },
          ]}
        >
          <Input
            type="text"
            name="educationContactPhone"
            value={formData.educationContactPhone}
            onChange={e => handleChange(e)}
          />
        </Form.Item>

        <Form.Item
          label="Education Contact Email"
          name="educationContactEmail"
          rules={[{ required: true, message: 'Education Email is required.' }]}
        >
          <Input
            type="email"
            name="educationContactEmail"
            value={formData.educationContactEmail}
            onChange={e => handleChange(e)}
            required
          />
        </Form.Item>
        <Form.Item label="Notes" name="notes">
          <Input.TextArea
            name="notes"
            value={formData.notes}
            onChange={e => handleChange(e)}
          />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button
            className="l2-btn btn"
            htmlType="submit"
            buttonText="Submit Village Edit"
          />
          <Required id="requiredMsg">
            Fields with <span id="required">&#42;</span> are required.
          </Required>
        </Form.Item>
      </Form>
    </FormContainer>
  );
};

export default connect(null, { editVillage })(VillageForm);

import React, { useState } from "react";
import { Button, Modal, Form, Input, InputNumber } from "antd";
import data from "./Data";
const { confirm } = Modal;

function Products() {
  // const [modalVisible, setmodalVisible] = useState(false);
  const [products, setproducts] = useState(data);
  
  const [title, settitle] = useState("");
  const [category, setcategory] = useState("");
  const [price, setprice] = useState("");
  const [ImageURL, setImageURL] = useState("");



  const DeleteHandle = (id) => {
    confirm({
      title: "Do you want to delete this items?",
      okText: "Yes",
      okType: "danger",
      // icon: <ExclamationCircleOutlined />,
      // content: 'Some descriptions',

      onOk() {
        const deleteItem = products.filter((item) => item.id !== id);
        setproducts(deleteItem);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

        // Modal and Form

  const [form] = Form.useForm()
    const [modalVisible, setmodalVisible] = useState(false);

    const handleCancel = () => {
      setmodalVisible(false)
        form.resetFields()
    }

    const handleOk = () => {
      form.submit() 
    }

    const onFinish = () => {
      let uid = Math.random().toString(36).substr(2, 32);
      let newproduct = {
        id :  uid ,
        title: title,
        category: category,
        price: price,
        image: ImageURL,
      };
      setproducts([newproduct, ...products]);
      setmodalVisible(false);
      console.log(products);
        setmodalVisible(false)
        form.resetFields()
    }

  return (
    <>
      <Modal 
         title="Add a product"
                visible={modalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOk}>
                        Add Product
                    </Button>,
                ]}
      >
        <Form form={form} 
          initialValues={{
            required: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="title"
            // write ( hasFeedback ) for validate sign
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input your product title!",
              },
            ]}
          >
            <Input
              placeholder="Title"
              type="text"
              name="title"
              onChange={(e) => {
                settitle(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            name="category"
            // write ( hasFeedback ) for validate sign
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input your product category!",
              },
            ]}
          >
            <Input
              placeholder=" Category"
              type="text"
              name="category"
              onChange={(e) => {
                setcategory(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            name="price"
            // write ( hasFeedback ) for validate sign
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input your product price!",
              },
            ]}
          >
            <InputNumber
              min={1}
              placeholder="Price"
              type="text"
              name="price"
              style={{ width: "100%" }}
              onChange={(e) => {
                setprice(e);
              }}
            />
          </Form.Item>
          <Form.Item
            name="ImageURL"
            // write ( hasFeedback ) for validate sign
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input your product ImageURL!",
              },
            ]}
          >
            <Input
              placeholder="ImageURL"
              type="text"
              name="ImageURL"
              onChange={(e) => {
                setImageURL(e.target.value);
              }}
            />
          </Form.Item>
        </Form>
      </Modal>

      <div class="d-grid gap-2 d-md-flex justify-content-end m-4">
        <Button type="primary" onClick={() => setmodalVisible(true)}>
          Add New Product
        </Button>
      </div>

      <table class="table ">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Category</th>
            {/* <th scope="col">Description</th> */}
            <th scope="col">Price</th>
            <th scope="col">Image</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => {
            return (
              <tr>
                <th scope="row">{index + 1}</th>
                <td style={{ width: 20 }}>{item.title}</td>
                <td>{item.category}</td>
                {/* <td style={{width:30}} >{item.description}</td> */}
                <td>${item.price}</td>
                <td>
                  <img
                    style={{ width: 50 }}
                    src={item.image}
                    alt={item.title}
                  />
                </td>
                <td>
                  <i className="bi bi-pencil-square border-0 btn-transition btn btn-outline-success " onClick={() => setmodalVisible(true)}></i>
                  <Button
                    style={{ border: "none" }} onClick={() => DeleteHandle(item.id)}>  <i className="ms-3 bi bi-trash3 border-0 btn-transition btn btn-outline-danger"></i>
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Products;

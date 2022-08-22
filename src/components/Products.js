import React, { useState } from "react";
import { Button, Modal, Form, Input, InputNumber, message } from "antd";
import data from "./Data";
const { confirm } = Modal;

function Products() {
    // const [modalVisible, setmodalVisible] = useState(false);
    let [products, setproducts] = useState(data);

    const [title, settitle] = useState("");
    const [category, setcategory] = useState("");
    const [price, setprice] = useState("");
    const [ImageURL, setImageURL] = useState("");
    const [EditID, setEditID] = useState(null);

    // Modal and Form

    const [form] = Form.useForm();
    const [modalVisible, setmodalVisible] = useState(false);

    // Update Handler
    const EditHandle = (item) => {
        setmodalVisible(true);
        form.setFieldsValue({
            title: item.title,
            category: item.category,
            price: item.price,
            ImageURL: item.image,
        });
        settitle(item.title);
        setcategory(item.category);
        setprice(item.price);
        setImageURL(item.image);

        setEditID(item.id);
        console.log(EditID);
    };

    const DeleteHandle = (id) => {
        confirm({
            title: "Do you want to delete this items?",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            // icon: <ExclamationCircleOutlined />,
            // content: 'Some descriptions',

            onOk() {
                const deleteItem = products.filter((item) => item.id !== id);
                setproducts(deleteItem);
                message.success("Product deleted successfully!");
            },
            onCancel() {
                console.log("Cancel");
            },
        });
    };

    const handleCancel = () => {
        setmodalVisible(false);
        form.resetFields();
    };

    const handleOk = () => {
        form.submit();
    };

    const onFinish = () => {
        let updatedProduct = {
            id: EditID,
            title: title,
            category: category,
            price: price,
            image: ImageURL,
        };

        if (EditID) {
            updatedProduct = products.map((item) => {
                if (item.id === EditID) {
                    return updatedProduct;
                } else {
                    return item;
                }
            });
            console.log(updatedProduct);
            setproducts(updatedProduct);
            message.success("Product updated successfully!");
            setmodalVisible(false);
            form.resetFields();
            setEditID(null);
        } else {
            let uid = Math.random().toString(36).substr(2, 32);
            let newproduct = {
                id: uid,
                title: title,
                category: category,
                price: price,
                image: ImageURL,
            };
            setproducts([newproduct, ...products]);
            message.success("Product added successfully!");
            setmodalVisible(false);
            console.log(products);
            setmodalVisible(false);
            form.resetFields();
        }
    };
    const onFinishFailed = () => {
        message.error("Something went wrong!");
    };

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
                    EditID
                        ? [
                              <Button
                                  key="submit"
                                  type="primary"
                                  onClick={handleOk}
                              >
                                  Update
                              </Button>,
                          ]
                        : [
                              <Button
                                  key="submit"
                                  type="primary"
                                  onClick={handleOk}
                              >
                                  Add Product
                              </Button>,
                          ],
                ]}
            >
                <Form
                    form={form}
                    initialValues={{
                        required: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="title"
                        // write ( hasFeedback ) for validate sign
                        hasFeedback
                        value={title}
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
                            value={title}
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
                            value={category}
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
                            value={price}
                            style={{ width: "100%" }}
                            onChange={(e) => {
                                setprice(e);
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="ImageURL"
                        type="text"
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
                            value={ImageURL}
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
                                    <i
                                        className="bi bi-pencil-square border-0 btn-transition btn btn-outline-success "
                                        onClick={() => {
                                            EditHandle(item);
                                        }}
                                    ></i>
                                    <Button
                                        style={{ border: "none" }}
                                        onClick={() => DeleteHandle(item.id)}
                                    >
                                        {" "}
                                        <i className="ms-3 bi bi-trash3 border-0 btn-transition btn btn-outline-danger"></i>
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

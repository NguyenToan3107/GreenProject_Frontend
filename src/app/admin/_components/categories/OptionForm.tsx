import React, {useState} from 'react';
import {Button, Form, Input, List, message, Modal, Tag} from 'antd';
import {useVariationStore} from "@/app/store/VariationStore";
import {createVariationOption} from "@/apis/modules/variation_option";

interface OptionFormProps {
    isModalOpen: boolean,
    setIsModalOpen: (value: boolean) => void
}

export interface CreateVariationOption {
    variationId: number,
    values: string,
}

const OptionForm: React.FC<OptionFormProps> = ({isModalOpen, setIsModalOpen}) => {
    const [form] = Form.useForm();

    const {variationId,reload}=useVariationStore();


    const [newOption, setNewOption] = useState('');


    async function handleSubmit(values: any) {

        if(variationId){
            try {
                const option:CreateVariationOption={
                    variationId:variationId,
                    values:values.values
                }
                const res:any=await createVariationOption(option)
                if(res.code==201){
                    setIsModalOpen(false)
                    form.resetFields()
                    reload();
                }
            }catch (e:any){
                message.error(e.response.message)

            }

        }


    }

    return (
        <Modal
            title="Manage Options"
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
            width={600}
            style={{top: 20}} // Position the modal a bit lower
        >
            <Form
                form={form}
                layout="vertical" // Changed to vertical for better label alignment
                onFinish={handleSubmit}
                className="my-5"
            >
                <Form.Item
                    label="New Option"
                    name="values"
                    rules={[{required: true, message: 'Please input a new option!'}]}
                >
                    <Input
                        placeholder="Enter new option"
                        value={newOption}
                        onChange={e => setNewOption(e.target.value)}
                        style={{width: '100%'}} // Make input full width
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{width: '100%'}} // Make button full width
                    >
                        Add Option
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default OptionForm;

import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import FormContainer from "../components/FormContainer"
import { toast } from "react-toastify"
import { useCreateFoodItemMutation } from '../slices/foodApiSlice'
import { useState, useEffect } from 'react'
const CreateItemScreen = () => {

    const [createFoodItem, { isLoading }] = useCreateFoodItemMutation()
    const [foodTitle, setFoodTitle] = useState('')
    const [foodDescription, setFoodDescription] = useState('')
    const [imageFile, setImageFile] = useState(null)

    const handleFoodTitleChange = (e) => {
        setFoodTitle(e.target.value)
    }
    const handleFoodDescriptionChange = (e) => {

        setFoodDescription(e.target.value)
    }
    const handleImageFileChange = (e) => {
        setImageFile(e.target.files[0])
    }
    const handleSubmit = async (e) => {

        e.preventDefault()
        if (!foodTitle || !foodDescription || !imageFile) {
            toast.error(" Make sure that all the fields are non-empty")
            return
        }
        let formData = new FormData()
        formData.append("name", foodTitle)
        formData.append("description", foodDescription)
        formData.append("file", imageFile, "foodImg.png")
        try {
            const res = await createFoodItem(formData).unwrap()
            toast.success("success")
        } catch (err) {
            toast.error(err?.data?.message || err.error)

        }
    }
    return (
        <div>

            <FormContainer>
                <Form onSubmit={handleSubmit}>
                    <Form.Group >
                        <Form.Label>Dish name </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Dish name"
                            value={foodTitle}
                            onChange={handleFoodTitleChange} />
                    </Form.Group>

                    <Form.Group >
                        <Form.Label>description </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="description"
                            value={foodDescription}
                            onChange={handleFoodDescriptionChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label> Image illustration </Form.Label>
                        <Form.Control
                            type="file"
                            onChange={handleImageFileChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-3">
                        Create dish
                    </Button>
                </Form>
            </FormContainer>
        </div>


    )
}
export default CreateItemScreen
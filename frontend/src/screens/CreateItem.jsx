import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import FormContainer from "../components/FormContainer"
import { toast } from "react-toastify"
import { useState, useEffect } from 'react'
import { createItem, selectError} from '../slices/foodItemSlice'
import { useDispatch,useSelector } from 'react-redux'

const CreateItemScreen = () => {
    const dispatch = useDispatch()
    const error = useSelector(selectError)
    const [foodTitle, setFoodTitle] = useState('')
    const [foodDescription, setFoodDescription] = useState('')
    const [imageFile, setImageFile] = useState(null)

    useEffect(() => {
        if (error) {
            
            toast.error(error)
        }
    },[error])
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
        formData.append("file", imageFile, imageFile.name)
        for (const entry of formData.entries()) {
            const [fieldName, fieldValue] = entry;
            // console.log(`Field Name: ${fieldName}, Field Value: ${fieldValue}`);
        }
        dispatch(createItem(formData))
        if (!error) {
            toast.success("success")
        }
        setFoodTitle("")
        setFoodDescription("")
        // setImageFile("")
        document.getElementById("image").value = ""
        setImageFile("")

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
                        <Form.Label>Description </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Description"
                            value={foodDescription}
                            onChange={handleFoodDescriptionChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label> Image illustration </Form.Label>
                        <Form.Control
                            type="file"
                            id="image"
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
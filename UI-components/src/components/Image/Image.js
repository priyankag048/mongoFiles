import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { LocalForm, Control, actions } from 'react-redux-form';
import { connect } from 'react-redux';

import { triggerImageUpload } from '../../actions/files.action';
import env from '../../config';
import './Image.css';

class Image extends Component {
    constructor(props) {
        super(props);
        let reader = new FileReader();
        this.changeImage = this.changeImage.bind(this);
        this.handlePictureChange = this.handlePictureChange.bind(this, reader);
        this.state = {
            profilePicture: ''
        }
    }

    /** attachDispatch is linked to form which helps to change the form values dynamically */
    attachDispatch(dispatch) {
        this.formDispatch = dispatch;
    }

    changeImage(event) {
        event.preventDefault();
        let upload = document.getElementById("image");
        upload.click();
    }

    handlePictureChange(reader, event) {
        let file = event.target.files[0];
        reader.onloadend = () => {
            this.setState({
                profilePicture: reader.result
            });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
        this.formDispatch(actions.change('image.file', file));
    }

    saveImage(data) {
        let formData = new FormData();
        formData.append('file', data.file[0], data.file[0].name);
        this.props.triggerImageUpload(formData);
    }

    render() {
        let picture;
        let { image } = this.props;
        if (this.state.profilePicture) {
            picture = this.state.profilePicture;
        } else if (image) {
            picture = `${env.url}file/${image}`
        } else {
            picture = '/assets/default_image.png'
        }
        return (
            <LocalForm model="image" 
                getDispatch={(dispatch) => this.attachDispatch(dispatch)}
                onSubmit={image => this.saveImage(image)}
            >
                <h2>Image Upload and render </h2>
                <div className="image-container">
                    <Control.file id="image" model="image.file" onChange={this.handlePictureChange} className="hide" />
                    <div>
                        <img src={picture} className="image" />
                    </div>
                    <div className="btn-container">
                        <button onClick={this.changeImage} className="btn change-image-btn">Change Picture</button>
                        <button type="submit" className="submit" className="btn actions">UPLOAD</button>
                    </div>
                       
                </div>
            </LocalForm>
        )
    }
}

const mapStateToProps = ({ image }) => {
    return {
        image
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        triggerImageUpload: (data) => dispatch(triggerImageUpload(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Image);
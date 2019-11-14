import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LocalForm, Control, actions } from 'react-redux-form';
import { triggerAttachmentUpload } from '../../actions/files.action';
import env from '../../config';
import './Attachments.css';

class Attachment extends Component {
    constructor(props) {
        super(props);
        this.showAttachments = this.showAttachments.bind(this);
        this.state = {
            files: []
        }
    }

    showAttachments(event) {
        let files = event.target.files;
        let attachments = [...files];

        this.formDispatch(actions.change('attachments.files', attachments));
        this.setState({
            attachments
        });
    }

    upload(event) {
        event.preventDefault();
        let upload = document.getElementById("file");
        upload.click();
    }

    saveFiles(files) {
        let formData = new FormData();
        for (let index = 0; index < files.length; index++) {
            formData.append('files', files[index], files[index].name);
        }
        this.props.triggerAttachmentUpload(formData);
    }

    /** attachDispatch is linked to form which helps to change the form values dynamically */
    attachDispatch(dispatch) {
        this.formDispatch = dispatch;
    }

    render() {
        let attachments = this.state.attachments;
        return (
            <LocalForm model="attachments"
                getDispatch={(dispatch) => this.attachDispatch(dispatch)}
                onSubmit={attachments => this.saveFiles(attachments.files)}
            >
                <h2> Attachments </h2>
                <div className="attachment-container">
                    <div>
                        <h3>Upload Attachments</h3>
                        <div className="attachment-container">
                            <div>
                                <Control.text id="attachments.files" model="offer.fileNames" className="attachment-file" disabled />
                                <input type="file" multiple id="file" ref="uploadInput" onChange={this.showAttachments} className="hide" />
                            </div>
                            <div>
                                <img src='/assets/attachment.jpeg' alt="calendar" className="attachment-img" onClick={this.upload} />
                            </div>
                        </div>
                        <div>
                            {attachments && attachments.length > 0 ? attachments.map((data, i) =>
                                <div key={i}>
                                    <div>{data.name}</div>
                                </div>
                            ) : <div></div>}
                        </div>
                        <div className="attachment-btn-container">
                            <button type="submit" className="submit" className="attachment-btn">UPLOAD</button>
                        </div>
                    </div>
                    <div class="downld-attachments">
                        <h3>Download Attachments</h3>
                        <ul>
                            {this.props.attachments && this.props.attachments.length > 0 ? this.props.attachments.map((data, i) => {
                                return (
                                    <li key={i}>
                                        <a href={`${env.url}attachment/${data.filename}`} download target="_blank">{data.originalname}</a>
                                    </li>
                                )
                            }) :
                                <div></div>}
                        </ul>
                    </div>
                </div>
            </LocalForm>
        )
    }
}

const mapStateToProps = ({ attachments }) => {
    return {
        attachments
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        triggerAttachmentUpload: (data) => dispatch(triggerAttachmentUpload(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Attachment);
import PropTypes from 'prop-types'

function BaseImageUploader(props) {
  return (
    <div>
      <input
        onChange={props.handleChange}
        accept='image/*'
        multiple
        type='file'
      />
    </div>
  )
}

BaseImageUploader.propTypes = {
  handleChange: PropTypes.func.isRequired,
}

export default BaseImageUploader
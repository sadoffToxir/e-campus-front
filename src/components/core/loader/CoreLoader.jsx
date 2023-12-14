import style from './CoreLoader.module.scss'
import PropTypes from 'prop-types'

const Loader = (props) => {
	return props.isLoading ? (
		<div className={style.loaderWrapper}>
			<div className={style.loaderOverlay} />
			<div className={style.loaderContent}>
				<div className={style.loader} />
			</div>
		</div>
	) : null
}

Loader.propTypes = {
	isLoading: PropTypes.bool.isRequired,
}

export default Loader

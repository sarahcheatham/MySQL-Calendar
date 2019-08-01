import { connect } from 'react-redux';
import App from '../App';
import { loadUsers, loadPosts } from '../store/actions';

const mapStateToProps = state => {
    return {
        users: {
            loading: state.loading,
            error: state.error,
            users: state.users
        },
        posts: {
            loading: state.loading,
            error: state.error,
            posts: state.posts
        }
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadUsers: () => dispatch(loadUsers()),
        loadPosts: () => dispatch(loadPosts())
    }
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps) (App);
export default AppContainer;
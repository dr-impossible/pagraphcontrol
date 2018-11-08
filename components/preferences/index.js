
const {
	pick,
} = require('ramda');

const r = require('r-dom');

const { connect } = require('react-redux');
const { bindActionCreators } = require('redux');

const { withStateHandlers } = require('recompose');

const { preferences: preferencesActions } = require('../../actions');

const Button = require('../button');
const Checkbox = require('../checkbox');

const Preferences = withStateHandlers(
	{
		open: false,
	},
	{
		toggle: ({ open }) => () => ({ open: !open }),
	},
)(({ open, toggle, ...props }) => r.div({
	classSet: {
		preferences: true,
		open,
	},
}, open ? [
	r.div([
		r(Button, {
			style: { width: '100%' },
			onClick: toggle,
		}, 'Close'),
	]),

	r.div([
		r(Checkbox, {
			checked: props.preferences.hideDisconnectedClients,
			onChange: () => props.actions.toggle('hideDisconnectedClients'),
		}, 'Hide disconnected clients'),
	]),

	r.div([
		r(Checkbox, {
			checked: props.preferences.hideDisconnectedModules,
			onChange: () => props.actions.toggle('hideDisconnectedModules'),
		}, 'Hide disconnected modules'),
	]),

	r.div([
		r(Checkbox, {
			checked: props.preferences.hideDisconnectedSource,
			onChange: () => props.actions.toggle('hideDisconnectedSource'),
		}, 'Hide disconnected source'),
	]),

	r.div([
		r(Checkbox, {
			checked: props.preferences.hideDisconnectedSinks,
			onChange: () => props.actions.toggle('hideDisconnectedSinks'),
		}, 'Hide disconnected sinks'),
	]),

	r.div([
		r(Checkbox, {
			checked: props.preferences.showDebugInfo,
			onChange: () => props.actions.toggle('showDebugInfo'),
		}, 'Show debug info'),
	]),

	r.div([
		r(Button, {
			style: { width: '100%' },
			onClick: props.actions.resetDefaults,
		}, 'Reset to defaults'),
	]),
] : [
	r(Button, {
		onClick: toggle,
	}, 'Props'),
]));

module.exports = connect(
	state => pick([ 'preferences' ], state),
	dispatch => ({
		actions: bindActionCreators(preferencesActions, dispatch),
	}),
)(Preferences);

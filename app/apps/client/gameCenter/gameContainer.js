import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { modal } from '../../../ui-utils';
import { RealAppClientUIHost } from '../RealAppClientUIHost';
import { Apps } from '../orchestrator';

import './gameContainer.html';

Template.GameContainer.currentExternalComponent = new ReactiveVar();

Template.GameContainer.helpers({
	isContextualBar() {
		const { data: { game } } = Template.instance();
		const { location } = game;

		return location === 'CONTEXTUAL_BAR';
	},
	isModal() {
		const { data: { game } } = Template.instance();
		const { location } = game;

		return location === 'MODAL';
	},
});

Template.GameContainer.events({
	'click .rc-game__close'() {
		modal.cancel();
	},
	'click .js-back'() {
		const { data: { clearGameManifestInfo } } = Template.instance();

		clearGameManifestInfo();
	},
});

Template.GameContainer.helpers({
	getExternalComponentState() {
		const realAppClientUIHost = new RealAppClientUIHost();
		const currentUser = realAppClientUIHost.getClientUserInfo();
		const currentRoom = realAppClientUIHost.getClientRoomInfo();

		return {
			currentUser,
			currentRoom,
		};
	},
});

Template.GameContainer.onCreated(function() {
	if (Apps && Apps.isLoaded) {
		Apps.get
	}
});

Template.GameContainer.onDestroyed(function() {

});

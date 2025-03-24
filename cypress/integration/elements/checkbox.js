import "../../support/elements/checkbox";
import {} from "../../support/config";
import {expandAllDirectories, verifyAllBoxesAreCheckedUnderRootTreeNodeWithId, verifyAllBoxesAreCheckedUnderTreeNodeWithId} from "../../support/elements/checkbox";

const config = require('../../support/config');
const commonHelper = require('../../support/common_util');
const navigator = require('../../support/navigator');

describe('elements section check box', () => {
    const url = config.e2e.baseUrl + "/elements";

    before(() => {
        commonHelper.goToPage(url)
        navigator.navigateToGroupAndItem(0, 'item-1')
    })

    afterEach(() => {
        commonHelper.reloadCurrentPage()
    })

    it('can check all boxes if Home root checkbox is checked', () => {
        commonHelper.checkBox('tree-node-home')
        expandAllDirectories()
        verifyAllBoxesAreCheckedUnderRootTreeNodeWithId('tree-node')
    })

    it('can check sub checkboxes of "Desktop" checkbox', () => {
        expandAllDirectories()
        commonHelper.checkBox('tree-node-desktop')
        verifyAllBoxesAreCheckedUnderTreeNodeWithId('tree-node-desktop')
    })

})
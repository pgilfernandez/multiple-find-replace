'use babel';

import MultipleFindReplace from '../lib/multiple-find-replace';

// Use the command ` ` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('MultipleFindReplace', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('multiple-find-replace');
  });

  describe('when the multiple-find-replace:replace event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.multiple-find-replace')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'multiple-find-replace:replace');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.multiple-find-replace')).toExist();

        let multipleFindReplaceElement = workspaceElement.querySelector('.multiple-find-replace');
        expect(multipleFindReplaceElement).toExist();

        let multipleFindReplacePanel = atom.workspace.panelForItem(multipleFindReplaceElement);
        expect(multipleFindReplacePanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'multiple-find-replace:replace');
        expect(multipleFindReplacePanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.multiple-find-replace')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'multiple-find-replace:replace');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let multipleFindReplaceElement = workspaceElement.querySelector('.multiple-find-replace');
        expect(multipleFindReplaceElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'multiple-find-replace:replace');
        expect(multipleFindReplaceElement).not.toBeVisible();
      });
    });
  });
});

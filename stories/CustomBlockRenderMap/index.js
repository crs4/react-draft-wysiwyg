/* @flow */

import React, { Component } from 'react';
import {
  EditorState,
  convertToRaw,
  ContentState,
  DefaultDraftBlockRenderMap
} from 'draft-js';
// import { blockRenderMap } from 'draftjs-utils';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import { Map } from 'immutable';
import { Editor } from '../../src';

function myBlockRenderer(contentBlock) {
  const type = contentBlock.getType();
  if (type !== 'unstyled') {
    console.log('Type: ', type);
  }
  const data = contentBlock.getData();
  // console.log('Data: ', data);
  // console.log('Data: ', contentBlock);
  // const entity = contentBlock.getEntityAt(0);
  // console.log('Entity: ', entity);
  // let data = null;
  // if (entity) {
  //   data = contentState.getEntity(entity).getData();
  //   debugger;
  // }

  // if (type === 'unstyled') {
  //   return {
  //     component: WYSIWYGScript,
  //     editable: false,
  //     props: {
  //       foo: 'bar'
  //     }
  //   };
  // }
  // return null;
}

class CustomBlockRenderMap extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    codeText: '<p>Hey this <strong>editor</strong> rocks 😀</p>',
  }

  onEditorStateChange: Function = (editorState) => {
    this.setState({
      editorState,
    });
  };

  setCodeText: Function = (e) => {
    const codeText = e.target.value;

    let editorState = EditorState.createEmpty();

    // TODO: try to modify htmlToDraft to allow: extendedBlockRenderMap types.
    const contentBlock = htmlToDraft(codeText); // This deletes script tags :/
    // const contentState = stateToHTML(editorCode);

    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      editorState = EditorState.createWithContent(contentState);
    }

    this.setState({
      editorState,
      codeText,
    });
  };

  render() {
    const {
      editorState,
      codeText,
    } = this.state;

    console.log('blockRenderMap: ', DefaultDraftBlockRenderMap);

    const extendedBlockRenderMap = DefaultDraftBlockRenderMap
      .merge(Map({
        'script': {
          element: 'script',
          wrapper: ({children}) => <script>{children}</script>
          // aliasedElements: ['script'],
        },
        'unstyled': {
          element: 'p',
          aliasedElements: ['p'],
        },
        'div': {
          element: 'div',
          wrapper: ({children}) => <div>{children}</div>
          // aliasedElements: ['div'],
        },
      }));

    console.log('extendedBlockRenderMap: ', extendedBlockRenderMap.toJS());

    return (
      <div className="rdw-storybook-root">
        <textarea
          className="rdw-storybook-textarea"
          value={codeText}
          onChange={this.setCodeText}
        />
        <Editor
          editorState={editorState}
          blockRenderMap={extendedBlockRenderMap}
          blockRendererFn={myBlockRenderer}
          toolbarClassName="rdw-storybook-toolbar"
          wrapperClassName="rdw-storybook-wrapper"
          editorClassName="rdw-storybook-editor"
          onEditorStateChange={this.onEditorStateChange}
        />
        <textarea
          readOnly
          className="rdw-storybook-textarea"
          value={JSON.stringify(convertToRaw(editorState.getCurrentContent()))}
        />
        <textarea
          readOnly
          className="rdw-storybook-textarea"
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        />
      </div>);
  }
}

export default CustomBlockRenderMap;

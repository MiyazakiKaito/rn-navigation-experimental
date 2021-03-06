/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule NavigationAbstractPanResponder
 * @flow
 */
'use strict';

const ReactNative = require('react-native');
const invariant = require('fbjs/lib/invariant');

const { PanResponder } = ReactNative;

import type  {
  NavigationPanPanHandlers,
} from 'NavigationTypeDefinition';

const EmptyPanHandlers = {
  onMoveShouldSetPanResponder: null,
  onPanResponderGrant: null,
  onPanResponderMove: null,
  onPanResponderRelease: null,
  onPanResponderTerminate: null,
};

/**
 * Abstract class that defines the common interface of PanResponder that handles
 * the gesture actions.
 */
class NavigationAbstractPanResponder {

  panHandlers: NavigationPanPanHandlers;

  constructor() {
    const config = {};
    Object.keys(EmptyPanHandlers).forEach(name => {
      const fn: any = (this: any)[name];

      invariant(
        typeof fn === 'function',
        'subclass of `NavigationAbstractPanResponder` must implement method %s',
        name
      );

      config[name] = fn.bind(this);
    }, this);

    this.panHandlers = PanResponder.create(config).panHandlers;
  }
}

module.exports = NavigationAbstractPanResponder;

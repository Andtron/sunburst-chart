/**
 * Copyright 2014-2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
/* global document */
/**
  * Renders the sunburst visualization. The parameter is the tree as returned
  * from the Personality Insights JSON API.
  */

'use strict';

const pick = require('lodash.pick');
const ChartRendererV3 = require('./d3-renderers/v3/personality-chart-renderer');
const ChartRendererV4 = require('./d3-renderers/v4/personality-chart-renderer');
const D3PersonalityProfileV2 = require('./d3-profile-wrappers/v2/index');
const D3PersonalityProfileV3 = require('./d3-profile-wrappers/v3/index');
const PersonalitySunburstChartImpl = require('./personality-sunburst-chart');

const DEFAULT_OPTIONS = {
  locale: 'en',
  version: 'v2',
  d3version: 'v3'
};

class PersonalitySunburstChart extends PersonalitySunburstChartImpl {

  constructor(options) {
    const _options = Object.assign({}, DEFAULT_OPTIONS, pick(options, ['element', 'selector', 'version', 'd3version', 'locale']));
    if (_options.version === 'v2') {
      if (_options.d3version === 'v3') {
        super(_options, D3PersonalityProfileV2, ChartRendererV3);
      } else {
        super(_options, D3PersonalityProfileV2, ChartRendererV4);
      }
    } else {
      if (_options.d3version === 'v3') {
        super(_options, D3PersonalityProfileV3, ChartRendererV3);
      } else {
        super(_options, D3PersonalityProfileV3, ChartRendererV4);
      }
    }
  }

  defaultOptions() {
    return DEFAULT_OPTIONS;
  }
}

module.exports = PersonalitySunburstChart;

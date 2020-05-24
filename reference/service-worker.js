/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/conventions/coding_style.html","2d9e6376ace99047b3351ae90abefa49"],["/conventions/documenting_code.html","f97f6bba8d0d0ceec6acf5fa2b90e4c4"],["/conventions/index.html","c4d84233b69aa01c5e5a1fd92c3dc2e3"],["/cover.jpg","b7da83a97f9bf6ef1851a345d4e2d40c"],["/database/connection.html","8a46f293a47e42d612abd108ad109fc8"],["/database/connection_pool.html","82b92402951b9ed4cc93549d2305b3f7"],["/database/index.html","67513b52c3611eea7ec6d3f6d35c434e"],["/database/transactions.html","ba977cf77f92f6c29286c9514e9573bb"],["/getting_started/cli.html","ddabe55320ef3302374fc857ee42b4b9"],["/getting_started/http_server.html","258903b49b7dab3e789347bf5e9e7583"],["/getting_started/index.html","a08954fd351837bc47c6cb16ba4509a3"],["/gitbook/fonts/fontawesome/fontawesome-webfont.eot","25a32416abee198dd821b0b17a198a8f"],["/gitbook/fonts/fontawesome/fontawesome-webfont.svg","d7c639084f684d66a1bc66855d193ed8"],["/gitbook/fonts/fontawesome/fontawesome-webfont.ttf","1dc35d25e61d819a9c357074014867ab"],["/gitbook/fonts/fontawesome/fontawesome-webfont.woff","c8ddf1e5e5bf3682bc7bebf30f394148"],["/gitbook/gitbook-plugin-edit-link/plugin.js","f60eaf9d2d7db05d70b8c7bb3b486835"],["/gitbook/gitbook-plugin-fontsettings/fontsettings.js","fab8f6412ce18bb367635b1bcae503ca"],["/gitbook/gitbook-plugin-fontsettings/website.css","056a6db3eef3553a78f3b7e02356b2e7"],["/gitbook/gitbook-plugin-highlight/ebook.css","fa203ae16ad9f01f4d20061fb9e7a6cc"],["/gitbook/gitbook-plugin-highlight/website.css","acce01e3e11cbd4b3882e7732d81f954"],["/gitbook/gitbook-plugin-lunr/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-lunr/search-lunr.js","4e91f557c3d72be045b9e146c2bc90bc"],["/gitbook/gitbook-plugin-offline/service-worker-registration.js","0b4c35226075896152de214f8860b76e"],["/gitbook/gitbook-plugin-search/lunr.min.js","9424f087f85dc7be8f7c7bc35b720f26"],["/gitbook/gitbook-plugin-search/search-engine.js","59ed9456a958a2930326955747048f8a"],["/gitbook/gitbook-plugin-search/search.css","6c8330e8aadd979bb37f872182257bdd"],["/gitbook/gitbook-plugin-search/search.js","5ba7dbf7c0e78b02dc48f83d55729e36"],["/gitbook/gitbook-plugin-sharing/buttons.js","e7c1c051d685b9e7530c1a6675e6b119"],["/gitbook/gitbook.js","a94df8aa71f9d96ce04b47484158c951"],["/gitbook/images/apple-touch-icon-precomposed-152.png","59313d171157503f5de7fd7e07f3c495"],["/gitbook/style.css","88a3a50e3559bc577c1be0de4fcc6c6d"],["/gitbook/theme.js","3fad3a9aa63adf0c194d522af5118794"],["/guides/ci/circleci.html","bd35c5852c98c8df37426316ec09a453"],["/guides/ci/travis.html","f4ef5c3eced5513e80a9bdde810515b5"],["/guides/concurrency.html","02cbcba20bb14fa7dccac9aa5576f84f"],["/guides/continuous_integration.html","4330d34d53c3cfe1e03ee7390c1e6582"],["/guides/hosting/github.html","acfa814dc65e2da8c84921753b6455e1"],["/guides/hosting/gitlab.html","b4142825d64c1888975097247d0aaf7f"],["/guides/hosting/gitlab_tags_new.png","717b55238b59f78083bf5cf4841a0e05"],["/guides/index.html","8b4cadd9c5a2c5a73d9c4418c1b48c6d"],["/guides/performance.html","0a9d3af3652b48ed206d10abb64db28c"],["/guides/testing.html","6bd425a61d7f307b8854289a36dc8144"],["/guides/writing_shards.html","8f4997b5d1c231de97d8e8ce9a0cb3e8"],["/index.html","ef1eef6ac5dbb2d90f9944e8511d313b"],["/syntax_and_semantics/alias.html","b11fab4a9386d9210491d3b71c7a46dd"],["/syntax_and_semantics/and.html","3d6b6f16519defa762a71a71a7f7ef0c"],["/syntax_and_semantics/annotations.html","98fbd1e00e2e5a02648a345467dc88d5"],["/syntax_and_semantics/annotations/built_in_annotations.html","dce0bd1b05f87d8dcdc30aad24c2de5d"],["/syntax_and_semantics/as.html","09c6404399db28b52cccf4fb1fd963b7"],["/syntax_and_semantics/as_a_suffix.html","a5d01d953a169f52ee5ea2ceb2c44d01"],["/syntax_and_semantics/as_an_expression.html","d96a3f0160cfae98e97362ce3595dc18"],["/syntax_and_semantics/as_question.html","3ad086365dbbd41aa72773812d29820b"],["/syntax_and_semantics/assignment.html","b58e8861878580975b855e9fff6bef8a"],["/syntax_and_semantics/block_forwarding.html","ba708f58df2938028b31d31ed67aeaea"],["/syntax_and_semantics/blocks_and_procs.html","111716675bf8ab83d854555ee63ba762"],["/syntax_and_semantics/break.html","f0e707d27affcfaf3d3a745a2d3646b4"],["/syntax_and_semantics/c_bindings/alias.html","c4369899b4b39e6c0fea62b5da7ee7e0"],["/syntax_and_semantics/c_bindings/callbacks.html","cb27faf27361c103fa3f720e7e1bed68"],["/syntax_and_semantics/c_bindings/constants.html","4d5203cdddb28d86d3c7d47e365e4b6b"],["/syntax_and_semantics/c_bindings/enum.html","4488405d3204474cac3d0e015dfcf209"],["/syntax_and_semantics/c_bindings/fun.html","b996950654db320a731e47fa615b0604"],["/syntax_and_semantics/c_bindings/index.html","e49723d4becd716ead8c8c1ce85e6a0c"],["/syntax_and_semantics/c_bindings/lib.html","93b687bbf41db5ba6b50fb37837e39df"],["/syntax_and_semantics/c_bindings/out.html","e840b89ad6a9ca3f8fd6df8c902e8a6c"],["/syntax_and_semantics/c_bindings/struct.html","6b4c9774cc14f7ca9c0ed26cd999e30e"],["/syntax_and_semantics/c_bindings/to_unsafe.html","1ec8dd3f3d117473cceaf443faff3a5a"],["/syntax_and_semantics/c_bindings/type.html","eb45583bc6bc2163677f495308841f97"],["/syntax_and_semantics/c_bindings/union.html","dc66509724c5bab080bd7136a1a48d7d"],["/syntax_and_semantics/c_bindings/variables.html","13b467244597eac1bd88ab328d15942c"],["/syntax_and_semantics/capturing_blocks.html","e7e3994bd1842f52b3de17fa819f25aa"],["/syntax_and_semantics/case.html","5b1d914481f34c8f29cc551723496046"],["/syntax_and_semantics/class_methods.html","7c107b21f4713ade88555be577bd77f9"],["/syntax_and_semantics/class_variables.html","2f4918d92e31a6bebcb4d40f2234384d"],["/syntax_and_semantics/classes_and_methods.html","816bbf3621dd8457163b84f12b66d865"],["/syntax_and_semantics/closures.html","d40dc328fde9f05abd2f0d19b30553d8"],["/syntax_and_semantics/comments.html","e9755fd6ddecc6511e6245ebed972e9c"],["/syntax_and_semantics/compile_time_flags.html","45c97fdf0b1558364356cf2e4e8fd1c0"],["/syntax_and_semantics/constants.html","8f9ae4a1f911b3de0f08d6bd7f1252aa"],["/syntax_and_semantics/control_expressions.html","777bb0d379dec85cedcbe57d0ad07d29"],["/syntax_and_semantics/cross-compilation.html","b7ac0b0a2d68f1629716c5726e60d17b"],["/syntax_and_semantics/declare_var.html","ce630b1355749e495ba28f12a6c1f63b"],["/syntax_and_semantics/default_and_named_arguments.html","4c727db7365305c8472b7fa5322feea1"],["/syntax_and_semantics/default_values_named_arguments_splats_tuples_and_overloading.html","1c014367bfd7717da1406755f8e1f34c"],["/syntax_and_semantics/enum.html","98e5fc26c848d3b06a8d84c003041bbb"],["/syntax_and_semantics/everything_is_an_object.html","36f6e630e88b18379a69595a9a3609f0"],["/syntax_and_semantics/exception_handling.html","6cc6b669ac83fc333cd2c4294dc402e6"],["/syntax_and_semantics/finalize.html","1b1cea4e5e1e309eb09a6502d76ff97b"],["/syntax_and_semantics/generics.html","60fe0ddb1ad10db5fef78c4b4b0cee10"],["/syntax_and_semantics/if.html","00aee02a641eb81d8099b57d35f63fea"],["/syntax_and_semantics/if_var.html","9a8cdaad15d7090e560a69359896fd75"],["/syntax_and_semantics/if_var_nil.html","b38fdb93e01671a2f171f6ed9078a9b7"],["/syntax_and_semantics/if_varis_a.html","3668eed1c066231f59581b41c6217115"],["/syntax_and_semantics/if_varresponds_to.html","f577803f867fc558c0c9fb98bda1a590"],["/syntax_and_semantics/index.html","5128e9259b4e169e4f56ae9682c36566"],["/syntax_and_semantics/inheritance.html","30e7c94668925e111cfcef6509841dad"],["/syntax_and_semantics/instance_sizeof.html","b15b9bd26583a07f20c9f8be6bb01991"],["/syntax_and_semantics/is_a.html","707fda697b326e42c1456e283853a5bb"],["/syntax_and_semantics/literals.html","2471996d64fdbb75007e873fb905132b"],["/syntax_and_semantics/literals/array.html","86f6fc4210b14744a6af9fb82eefc34b"],["/syntax_and_semantics/literals/bool.html","66bca211da658e3ff06293b317b5c9f8"],["/syntax_and_semantics/literals/char.html","671131ee2b798bfb07cab93e616d9985"],["/syntax_and_semantics/literals/command.html","662cdc436d7c0bd34a0a69b87ae83e16"],["/syntax_and_semantics/literals/floats.html","82f9f25ac9e7a3cb19b7480fdc90d3de"],["/syntax_and_semantics/literals/hash.html","f906a6c07f65ad0d03633581cc95d488"],["/syntax_and_semantics/literals/integers.html","446692652d08ba97e0238023d828b4ab"],["/syntax_and_semantics/literals/named_tuple.html","81005cffef4c2aaa448abf3eb9a1bf77"],["/syntax_and_semantics/literals/nil.html","ad5adf22d0ba93467886fc8173590e1a"],["/syntax_and_semantics/literals/proc.html","ac212ac340effd9fb85df6d97c03c492"],["/syntax_and_semantics/literals/range.html","e32dfe916fa4cf37a6a3acf7bf87b962"],["/syntax_and_semantics/literals/regex.html","7b0b5b2c630fdbf81b432e7e28970f22"],["/syntax_and_semantics/literals/string.html","a597114a8532bcbd8073c8748fab99fb"],["/syntax_and_semantics/literals/symbol.html","52202b983fa214d20a643d2d53c3d9c2"],["/syntax_and_semantics/literals/tuple.html","c9f9f14661980c8da068332152e1ccd6"],["/syntax_and_semantics/local_variables.html","82ea9a280827f6ca2de731043c6f570b"],["/syntax_and_semantics/low_level_primitives.html","4e2bde6e51148c9d51c3243107470f63"],["/syntax_and_semantics/macros.html","76be8a2a333c84079fef19e06224d393"],["/syntax_and_semantics/macros/fresh_variables.html","e31ead281bfad2b8ebdb0f2de78f009d"],["/syntax_and_semantics/macros/hooks.html","e4c464aac33320dc577ad3e39c2ad649"],["/syntax_and_semantics/macros/macro_methods.html","9ccd67d1f209f1ff230f6f4389ead751"],["/syntax_and_semantics/methods_and_instance_variables.html","ec306fb9835ae2499e0d6a731300e38f"],["/syntax_and_semantics/modules.html","bfcf6216bac6403e3b3a6188f66f9a57"],["/syntax_and_semantics/new,_initialize_and_allocate.html","5667191034b4fd7affd91d7641f30e65"],["/syntax_and_semantics/next.html","4284ab4263c78ff36ce253700a093e3a"],["/syntax_and_semantics/nil_question.html","e885414db2fd9f3f334039b3d8dc4678"],["/syntax_and_semantics/not.html","e8e89690334d98cb43e8e8f6de823955"],["/syntax_and_semantics/offsetof.html","ef8b2f1bdbdb0d0dce13447481e110ca"],["/syntax_and_semantics/operators.html","602321a11db5020ebad4be2a58b70a2f"],["/syntax_and_semantics/or.html","1af55066cfce793c7830819c0df5220d"],["/syntax_and_semantics/overloading.html","f2dc554335e9469d838fc59e63c41d05"],["/syntax_and_semantics/pointerof.html","acd393b160861bbed2b0ee0756c2f07c"],["/syntax_and_semantics/proc_literal.html","cf958069781c2509fd7c2dd622bf476e"],["/syntax_and_semantics/requiring_files.html","70ee7dbcf5fd3c22e709e3df98700fa5"],["/syntax_and_semantics/responds_to.html","510dc405445fe600555be59ccb0a9ac1"],["/syntax_and_semantics/return_types.html","18eec1576be03c6d5792c007b8e67bf3"],["/syntax_and_semantics/sizeof.html","1bb356b86d2bcf98c114cc503eb93113"],["/syntax_and_semantics/splats_and_tuples.html","6e7aafefc1fcc1930f002316449ecaeb"],["/syntax_and_semantics/structs.html","307999522a7da50023221c8757577d5c"],["/syntax_and_semantics/ternary_if.html","ac7a073f56c1f124718a3f9597acdc16"],["/syntax_and_semantics/the_program.html","dba7a8b039731248d8083b343724f4eb"],["/syntax_and_semantics/truthy_and_falsey_values.html","c4b3f49f4970bd59e0295ce9e053a8d7"],["/syntax_and_semantics/type_grammar.html","ba71e3b02efd2c0f884daada99994c3b"],["/syntax_and_semantics/type_inference.html","c489f6e2ed693f384df0547cfd702625"],["/syntax_and_semantics/type_reflection.html","e820203c4d611840391b8072be1f5b79"],["/syntax_and_semantics/type_restrictions.html","45d5a98e49f832faf14763bed9b4de89"],["/syntax_and_semantics/typeof.html","64d8e1420b49cbb1580c8a23c67148db"],["/syntax_and_semantics/types_and_methods.html","63a6fa2c9c30fa60d293ce38998662f8"],["/syntax_and_semantics/union_types.html","672213c5ccd0ccb86c739758353cb951"],["/syntax_and_semantics/unless.html","c18c1f099c393cc2931db5dfb43dd2ad"],["/syntax_and_semantics/unsafe.html","b092ac7d8f4d56202303a32566620d91"],["/syntax_and_semantics/until.html","9a35c927dbfd5a7e4264631dfd922f60"],["/syntax_and_semantics/virtual_and_abstract_types.html","48453256112aa448bc7dd87441b3b393"],["/syntax_and_semantics/visibility.html","cfa30d11ca75ae6f177bedd39c82950f"],["/syntax_and_semantics/while.html","7929bc14dd4ea5526ef1ea18ece83317"],["/the_shards_command/index.html","85b9fa1a955b02bbe101aa27955c4a98"],["/using_the_compiler/crystal-play.png","9a498a63b1e2933abee759d4c08fddf4"],["/using_the_compiler/index.html","6a76bff21ecc1f8099c241e58997003e"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});








//
//  RNNetworkState.m
//
//  Created by Anh Tuan Nguyen on 8/7/18.
//  Copyright © 2018 ReactNativeVietnam. All rights reserved.
//

#import "RNNetworkState.h"
#import <AFnetworking/AFNetworkReachabilityManager.h>


@implementation RNNetworkState {
  BOOL hasListeners;
}

RCT_EXPORT_MODULE();

- (dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}

- (void)startObserving {
  hasListeners = YES;
}

- (void)stopObserving {
  hasListeners = NO;
}

- (NSArray<NSString *> *)supportedEvents {
  return @[@"networkChanged"];
}

- (void)dealloc {
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (instancetype) init {
  
  if (self) {
    
//    AFNetworkReachabilityManager *manager = [AFNetworkReachabilityManager sharedManager];
//    [manager startMonitoring];
//    [manager setReachabilityStatusChangeBlock:^(AFNetworkReachabilityStatus status) {
//      NSLog(@"Reachability changed: %@", AFStringFromNetworkReachabilityStatus(status));
//
//      if(hasListeners) {
//        NSDictionary *data = @{@"isConnected": @YES, @"isFast": @NO, @"type": @[AFStringFromNetworkReachabilityStatus(status)] };
//        switch (status) {
//          case AFNetworkReachabilityStatusReachableViaWWAN:
//          case AFNetworkReachabilityStatusReachableViaWiFi:
//            [data setValue:@YES forKey:@"isConnected"];
//            [data setValue:@YES forKey:@"isFast"];
//            break;
//          case AFNetworkReachabilityStatusNotReachable:
//          default:
//            [data setValue:@NO forKey:@"isConnected"];
//            [data setValue:@NO forKey:@"isFast"];
//            break;
//        }
//        [self sendEventWithName:@"networkChanged" body:data];
//      }
    
//    }];
    
//    [NSTimer scheduledTimerWithTimeInterval:2.0
//                                     target:self
//                                   selector:@selector(onTick:)
//                                   userInfo:nil
//                                    repeats:YES];
    
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(reachabilityChanged:)
                                                 name:kReachabilityChangedNotification
                                               object:nil];
    
    self.connReachability = [Reachability reachabilityWithHostName:@"www.google.com"];
    [self.connReachability startNotifier];
    
  }
  return [super init];
}

//-(void)onTick:(NSTimer *)timer {
  //connection unavailable
//  if(hasListeners) {
  
//  BOOL isConnected = [[Reachability reachabilityForInternetConnection] currentReachabilityStatus] != NotReachable;
//  NSLog(@"%@", isConnected ? @"yes" : @"no");
//    [self sendEventWithName:@"networkChanged" body:data];
  
//  }
//}

- (void)reachabilityChanged:(NSNotification*)notification
{
  Reachability *notifier = [notification object];
  NSLog(@"Connection Status: %@", [notifier currentReachabilityString]);
}


@end

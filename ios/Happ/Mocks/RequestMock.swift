//
//  RequestMock.swift
//  Happ
//
//  Created by Maksymilian Galas on 13/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import Foundation

final class RequestMock: Requestable {
    private var successCallback: (() -> Void)? = nil
    private var dataSuccessCallback: ((Data?) -> Void)? = nil
    
    var responseData: ResponseData?
    
    init(responseData: ResponseData?) {
        self.responseData = responseData
    }
    
    init(url: URL, endpoint: Endpointable, tokens: Tokens?, forceQueryItemsUse: Bool, shouldRefreshToken: Bool) { }
    
    func onTokenExpired(_ callback: @escaping () -> Void) -> Self {
        return self
    }
    
    func onSuccess(_ callback: @escaping () -> Void) -> Self {
        successCallback = callback
        return self
    }
    
    func onDataSuccess<RD: ResponseData>(_ callback: @escaping (RD?) -> Void) -> Self {
        dataSuccessCallback = { [weak self] _ in
            callback(self?.responseData as? RD)
        }
        return self
    }
    
    func onDownloadSuccess(_ callback: @escaping (Data?) -> Void) -> Self {
        dataSuccessCallback = callback
        return self
    }
    
    func onUploadSuccess(_ callback: @escaping () -> Void) -> Self {
        successCallback = callback
        return self
    }
    
    func onProgressChange(_ callback: @escaping (Double) -> Void) -> Self {
        return self
    }
    
    func onError(_ callback: @escaping (Error) -> Void) -> Self {
        return self
    }
    
    func replaceTokens(_ tokens: Tokens?) -> Self {
        return self
    }
    
    func make() {
        if let successCallback = successCallback {
            successCallback()
        } else {
            dataSuccessCallback?(nil)
        }
    }
    
    func download() {
        dataSuccessCallback?(nil)
    }
    
    func upload(file: URL) {
        dataSuccessCallback?(nil)
    }
    
    func upload(data: Data) {
        dataSuccessCallback?(nil)
    }
    
    func cancel() { }
}

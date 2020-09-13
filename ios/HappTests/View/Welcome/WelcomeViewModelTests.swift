//
//  WelcomeViewModelTests.swift
//  HappTests
//
//  Created by Maksymilian Galas on 13/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import XCTest
@testable import Happ

class WelcomeViewModelTests: XCTestCase {

    var viewModel: WelcomeViewModel!

    override func setUpWithError() throws {
        let apiRequest = APIRequestMock()
        viewModel = WelcomeViewModel(apiRequest: apiRequest)
    }

    override func tearDownWithError() throws {
        viewModel = nil
    }

    func testSignInSuccess() throws {
        let promise = expectation(description: "Success")
        
        viewModel.signIn(onSuccess: {
            promise.fulfill()
        }, onError: { error in
            XCTFail(error.localizedDescription)
        })

        wait(for: [promise], timeout: 5)
    }

}

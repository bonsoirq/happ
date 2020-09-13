//
//  Coordinator.swift
//  Happ
//
//  Created by Maksymilian Galas on 13/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import SwiftUI
import Combine

final class Coordinator: ObservableObject {
    let objectWillChange = ObservableObjectPublisher()
    
    func refresh() {
        objectWillChange.send()
    }
}

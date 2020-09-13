//
//  ViewModelable.swift
//  Happ
//
//  Created by Maksymilian Galas on 13/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import Foundation

protocol ViewModelable {
    associatedtype VM: ViewModel
    var coordinator: Coordinator { get }
    var viewModel: VM { get set }
}

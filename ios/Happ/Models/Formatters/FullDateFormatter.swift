//
//  FullDateFormatter.swift
//  Happ
//
//  Created by Maksymilian Galas on 13/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import Foundation

final class FullDateFormatter: DateFormatter {
    
    override init() {
        super.init()
        setupDateFormat()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupDateFormat()
    }
    
    private func setupDateFormat() {
        dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSSSS"
    }
    
}

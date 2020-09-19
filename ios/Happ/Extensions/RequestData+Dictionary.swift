//
//  Encodable+Dictionary.swift
//  Happ
//
//  Created by Maksymilian Galas on 13/09/2020.
//  Copyright © 2020 Infinity Pi Ltd. All rights reserved.
//

import Foundation

extension RequestData {
    
    var dictionary: [String : AnyHashable] {
        let encoder = JSONEncoder()
        encoder.dateEncodingStrategy = .formatted(FullDateFormatter())
        
        guard let data = try? encoder.encode(self) else { return [:] }
        let jsonObject = try? JSONSerialization.jsonObject(with: data, options: .allowFragments)
        return jsonObject.flatMap { $0 as? [String : AnyHashable] } ?? [:]
    }
    
}

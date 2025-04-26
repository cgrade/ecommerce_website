import Link from 'next/link';

export default function SizeGuidePage() {
  return (
    <div className="bg-[#f9f9f9] py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb navigation */}
        <div className="flex items-center text-sm mb-6 text-gray-500">
          <Link href="/" className="hover:text-gray-800">Home</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-800">Size Guide</span>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Size Guide</h1>
          
          <p className="text-gray-600 mb-8">
            Use these size charts to find your perfect fit. If you're between sizes, we recommend sizing up for a more comfortable fit.
          </p>
          
          <div className="space-y-12">
            {/* Clothing Size Guide */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Clothing Sizes</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chest (in)</th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waist (in)</th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hips (in)</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">XS</td>
                      <td className="px-4 py-3 text-sm text-gray-600">30-32</td>
                      <td className="px-4 py-3 text-sm text-gray-600">24-26</td>
                      <td className="px-4 py-3 text-sm text-gray-600">34-36</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">S</td>
                      <td className="px-4 py-3 text-sm text-gray-600">34-36</td>
                      <td className="px-4 py-3 text-sm text-gray-600">28-30</td>
                      <td className="px-4 py-3 text-sm text-gray-600">38-40</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">M</td>
                      <td className="px-4 py-3 text-sm text-gray-600">38-40</td>
                      <td className="px-4 py-3 text-sm text-gray-600">32-34</td>
                      <td className="px-4 py-3 text-sm text-gray-600">42-44</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">L</td>
                      <td className="px-4 py-3 text-sm text-gray-600">42-44</td>
                      <td className="px-4 py-3 text-sm text-gray-600">36-38</td>
                      <td className="px-4 py-3 text-sm text-gray-600">46-48</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">XL</td>
                      <td className="px-4 py-3 text-sm text-gray-600">46-48</td>
                      <td className="px-4 py-3 text-sm text-gray-600">40-42</td>
                      <td className="px-4 py-3 text-sm text-gray-600">50-52</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">XXL</td>
                      <td className="px-4 py-3 text-sm text-gray-600">50-52</td>
                      <td className="px-4 py-3 text-sm text-gray-600">44-46</td>
                      <td className="px-4 py-3 text-sm text-gray-600">54-56</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            
            {/* Shoe Size Guide */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Shoe Sizes</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">US</th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UK</th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EU</th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Foot Length (cm)</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">5</td>
                      <td className="px-4 py-3 text-sm text-gray-600">3</td>
                      <td className="px-4 py-3 text-sm text-gray-600">35</td>
                      <td className="px-4 py-3 text-sm text-gray-600">22</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">6</td>
                      <td className="px-4 py-3 text-sm text-gray-600">4</td>
                      <td className="px-4 py-3 text-sm text-gray-600">36</td>
                      <td className="px-4 py-3 text-sm text-gray-600">22.5</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">7</td>
                      <td className="px-4 py-3 text-sm text-gray-600">5</td>
                      <td className="px-4 py-3 text-sm text-gray-600">37-38</td>
                      <td className="px-4 py-3 text-sm text-gray-600">23.5</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">8</td>
                      <td className="px-4 py-3 text-sm text-gray-600">6</td>
                      <td className="px-4 py-3 text-sm text-gray-600">39</td>
                      <td className="px-4 py-3 text-sm text-gray-600">24.5</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">9</td>
                      <td className="px-4 py-3 text-sm text-gray-600">7</td>
                      <td className="px-4 py-3 text-sm text-gray-600">40-41</td>
                      <td className="px-4 py-3 text-sm text-gray-600">25.5</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">10</td>
                      <td className="px-4 py-3 text-sm text-gray-600">8</td>
                      <td className="px-4 py-3 text-sm text-gray-600">42</td>
                      <td className="px-4 py-3 text-sm text-gray-600">26.5</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">11</td>
                      <td className="px-4 py-3 text-sm text-gray-600">9</td>
                      <td className="px-4 py-3 text-sm text-gray-600">43-44</td>
                      <td className="px-4 py-3 text-sm text-gray-600">27.5</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">12</td>
                      <td className="px-4 py-3 text-sm text-gray-600">10</td>
                      <td className="px-4 py-3 text-sm text-gray-600">45</td>
                      <td className="px-4 py-3 text-sm text-gray-600">28.5</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            
            {/* How to Measure */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4">How to Measure</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-800">Chest</h3>
                  <p className="text-gray-600">Measure around the fullest part of your chest, keeping the measuring tape horizontal.</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800">Waist</h3>
                  <p className="text-gray-600">Measure around your natural waistline, keeping the tape comfortably loose.</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800">Hips</h3>
                  <p className="text-gray-600">Measure around the fullest part of your hips, approximately 8" below your natural waistline.</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800">Foot Length</h3>
                  <p className="text-gray-600">Measure from the back of your heel to the tip of your longest toe.</p>
                </div>
              </div>
            </section>
          </div>
          
          <div className="mt-12 pt-6 border-t border-gray-200">
            <p className="text-gray-600 italic">
              Note: These are general guidelines. Exact sizing may vary by style, manufacturer, and personal preference.
            </p>
            
            <div className="mt-6">
              <Link href="/products" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                ← Back to Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

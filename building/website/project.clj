(defproject website "0.1.0-SNAPSHOT"
  :description "build tools for personal web template/clojure practice. to be turned into full-fledged web dev project over time"
  :url "http://paul-gowder.com"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [selmer "1.0.0"]]  
  :main ^:skip-aot website.core
  :target-path "target/%s"
  :profiles {:uberjar {:aot :all}})

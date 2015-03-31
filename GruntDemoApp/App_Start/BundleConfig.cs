using System.Web;
using System.Web.Optimization;

namespace GruntDemoApp
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            BundleTable.EnableOptimizations = true;

            bundles.Add(new ScriptBundle("~/bundles/vendorBodyJs").Include(
                        "~/Scripts-Build/jquery-{version}.min.js",
                        "~/Scripts-Build/jquery.validate*",
                        "~/Scripts-Build/bootstrap.min.js",
                        "~/Scripts-Build/respond.min.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/vendorHeadJs").Include(
                        "~/Scripts-Build/modernizr-*"));
            
            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content-Build/bootstrap/bootstrap.min.css",
                      "~/Content-Build/my/site.min.css"));
        }
    }
}

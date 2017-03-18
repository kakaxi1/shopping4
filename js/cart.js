define("lib", ["require", "jquery"], function(i) {
	function e() {
		"placeholder" in document.createElement("input") || t("input[placeholder], textarea[placeholder]").each(function() {
			var i = t(this),
				e = i.attr("placeholder");
			"" === i.val() && i.val(e).addClass("placeholder"), i.focus(function() {
				i.val() === e && i.val("").removeClass("placeholder")
			}), i.blur(function() {
				"" === i.val() && i.val(e).addClass("placeholder")
			})
		})
	}
	var t = i("jquery");
	t.cookie = function(i, e, t) {
		if ("undefined" == typeof e) {
			var o = null;
			if (document.cookie && "" !== document.cookie)
				for (var n = document.cookie.split(";"), a = 0; a < n.length; a++) {
					var s = n[a].replace(/\s/g, "");
					if (s.substring(0, i.length + 1) == i + "=") {
						o = decodeURIComponent(s.substring(i.length + 1));
						break
					}
				}
			return o
		}
		t = t || {}, null === e && (e = "", t.expires = -1);
		var d = "";
		if (t.expires && ("number" == typeof t.expires || t.expires.toUTCString)) {
			var r;
			"number" == typeof t.expires ? (r = new Date, r.setTime(r.getTime() + 60 * t.expires * 60 * 1e3)) : r = t.expires, d = "; expires=" + r.toUTCString()
		}
		var c = t.path ? "; path=" + t.path : "",
			l = t.domain ? "; domain=" + t.domain : "",
			u = t.secure ? "; secure" : "";
		document.cookie = [i, "=", encodeURIComponent(e), d, c, l, u].join("")
	};
	var o = {
		versions: function() {
			var i = navigator.userAgent.toLowerCase();
			return {
				weixin: i.indexOf("micromessenger") != -1,
				android: i.indexOf("android") != -1,
				iPhone: i.indexOf("iphone") != -1,
				iPad: i.indexOf("ipad") != -1
			}
		}()
	};
	return setTimeout(function() {
		var i = document.createElement("script");
		i.src = "http://w.cnzz.com/q_stat.php?id=1260091035&l=3", document.body.appendChild(i);
		var e = document.createElement("script");
		e.src = "http://push.zhanzhang.baidu.com/push.js";
		var t = document.getElementsByTagName("script")[0];
		t.parentNode.insertBefore(e, t)
	}, 100), e.prototype = {
		getIsOnline: function() {
			return location.href.indexOf("www.maimaicn.com") > -1
		},
		getReq: function() {
			var i = "http://mmkyf.maimaicn.com/mmjmanager/",
				e = "wx19a29141ad9f0609";
			this.getIsOnline() && (i = "http://api.maimaicn.com/mmjmanager/", e = "wxd7221902b2883fad");
			var t = new Array(i, i, i, i, i);
			return {
				ser: t[this.getRandom(4)],
				imgPath: "http://image.maimaicn.com/",
				image: "http://image.maimaicn.com:18888/",
				appid: e
			}
		},
		getImgSize: function(i, e) {
			return i.indexOf("img") > -1 ? i + "_" + e : i
		},
		getCartNum: function() {
			this.ajx(this.getReq().ser + "shoppingCart/getCartNum.action", {}, function(i) {
				"0" === i.infocode && t("#index_header_cart_num, #home_header_cart_num").text(i.info)
			}, function() {
				console.log("数据请求失败")
			})
		},
		getRandom: function(i) {
			return Math.floor(Math.random() * (i + 1))
		},
		trim: function(i) {
			return i.replace(/(^\s*)|(\s*$)/g, "")
		},
		getUrlParam: function(i) {
			if ("backUrl" === i || "payPath" === i) return window.location.search.split(i + "=")[1];
			var e = new RegExp("(^|&)" + i + "=([^&]*)(&|$)"),
				t = window.location.search.substr(1).match(e),
				o = null !== t ? decodeURI(t[2]) : "";
			return o
		},
		getBackUrl: function() {
			var i = window.location.href;
			return i.indexOf(".com") > -1 && i.indexOf(".com:") === -1 ? i.substring(i.indexOf(".com") + 4) : i
		},
		checkMobile: function() {
			return !!(o.versions.iPhone || o.versions.iPad || o.versions.android)
		},
		checkWeiXin: function() {
			return !!o.versions.weixin
		},
		gotopFun: function() {
			var i = t("#upBtn");
			t(window).scroll(function() {
				t(this).scrollTop() > 200 ? i.show() : i.hide()
			})
		},
		ajx: function(i, e, o, n) {
			var a = this;
			e = null === e || "" === e || "undefined" == typeof e ? {
				date: (new Date).getTime()
			} : e, t.ajax({
				type: "get",
				url: i,
				data: e,
				dataType: "jsonp",
				jsonp: "jsonpCallback",
				success: function(i) {
					a.offLoading(), o(i)
				},
				error: function(i) {
					a.offLoading(), n(i)
				}
			})
		},
		getMid: function() {
			var i = t.cookie("member_memberId");
			return null === i ? "mId=1" : "mId=" + i
		},
		onLoading: function() {
			t(".spinner").is(":hidden") && t(".spinner").css("display", "block")
		},
		offLoading: function() {
			t(".spinner").css("display", "none")
		},
		getLoginName: function() {
			var i = t.cookie("member_loginName");
			return i ? i : ""
		},
		logOut: function() {
			this.ajx(this.getReq().ser + "/member/logout.action", {}, function(i) {
				"0" === i.infocode && (window.location = "/index.html")
			})
		}
	}, e
}), define("common", ["require", "jquery", "lib"], function(i) {
	var e = i("jquery"),
		t = i("lib");
	t = new t;
	var o = {
		init: function() {
			var i = this;
			1 !== location.pathname.length && 0 !== location.pathname.indexOf("/index.html") || "首页" === e("#index_header_nav > li:eq(1) a").text() && e("#index_header_nav > li:eq(1)").remove(), i.bindEvent()
		},
		bindEvent: function() {
			var i = this;
			e(".ui-sort-first li").hover(function() {
				e(this).children("div").css("display", "block")
			}, function() {
				e(this).children("div").css("display", "none")
			}), 1 !== location.pathname.length && 0 !== location.pathname.indexOf("/index.html") && e("#index_header_nav li.fenl").hover(function() {
				e(this).children("div").css("display", "block")
			}, function() {
				e(this).children("div").css("display", "none")
			}), e("#index_header_search_text, #home_header_search_text").focus(function() {
				"" !== t.trim(e(this).val()) && i.goodsBaseListSerach(t.trim(e(this).val()))
			}), e("#index_header_search_text, #home_header_search_text").bind("input propertychange", function() {
				"" !== t.trim(e(this).val()) ? i.goodsBaseListSerach(t.trim(e(this).val())) : e(".ui-shelper").empty()
			}), e(".ind_search_t").hover(function() {}, function() {
				e(".ui-shelper").empty()
			}), e(".ui-shelper").on("click", "li", function() {
				location.href = "/list/search.html?key=" + t.trim(e(this).children().eq(0).text())
			}), e("#searchForm").on("submit", function() {
				var i = t.trim(e("#searchForm input").val());
				i ? location.href = "/list/search.html?key=" + i : e("#searchForm input").attr("data-url") && (location.href = e("#searchForm input").attr("data-url"))
			})
		},
		goodsBaseListSerach: function(i) {
			t.ajx(t.getReq().ser + "goodsBase/goodsBaseListSerach.action", {
				goodsKeywords: encodeURIComponent(i)
			}, function(i) {
				if ("0" === i.infocode) {
					var t = "";
					e.each(i.info.sho, function(i, e) {
						t += "<li><div>" + e.cnName + '</div><div class="ui-result">约' + e.qre + "个商品</div></li>"
					}), e(".ui-shelper").empty().append(t)
				}
			})
		}
	};
	o.init()
}), requirejs.config({
	baseUrl: "/js/lib"
}), require(["jquery", "lib", "common"], function(i, e) {
	e = new e, i(function() {
		function t() {
			var t = this;
			e.ajx(e.getReq().ser + "/adPlan/getHomePageInfo.action", {}, function(o) {
				if (0 == o.infocode) {
					for (var n = "", a = o.info.topMap.topList, s = 0; s < a.length; s++) n += '<a href="' + a[s].adLink + '" class="swiper-slide" target="_blank" style="background:url(' + e.getReq().imgPath + a[s].pictureUrl + ') no-repeat center center"></a>';
					i("#index-banner .swiper-wrapper").html(n), t.slider_1 = new Swiper("#index-banner", {
						loop: !0,
						autoplay: 5e3,
						speed: 1e3,
						autoplayDisableOnInteraction: !1,
						pagination: ".swiper-pagination",
						paginationClickable: !0,
						calculateHeight: !0,
						onTouchStart: function(i) {
							t.sTP = i.translate
						},
						onTouchEnd: function(i) {
							t.eTP = i.translate
						}
					})
				} else alert(o.info)
			})
		}
		"/" !== location.pathname && "/index.html" !== location.pathname || t();
		var o = e.getLoginName(),
			n = i("#index_header_quit"),
			a = i("#index_header_a"),
			s = "/home/index.html";
		o ? (n.html("退出"), a.attr("href", s), a.html(o)) : (s = "/member/login.html?backUrl=" + e.getBackUrl(), a.attr("href", s), a.html("买买电商欢迎您，请登录")), n.on("click", function() {
			"退出" == i(this).html() ? e.logOut() : location.href = "/member/reg.html"
		}), e.ajx(e.getReq().ser + "shoppingCart/getCartNum.action", {}, function(e) {
			var t = 0;
			"0" === e.infocode && (t = e.info), i("#index_header_cart_num").text(t)
		}, function() {
			i("#index_header_cart_num").text(0)
		}), i("#index_header_search_button").on("click", function() {
			var t = e.trim(i("#index_header_search_text").val());
			t ? location.href = "/list/search.html?key=" + t : i("#searchForm input").attr("data-url") && (location.href = i("#searchForm input").attr("data-url"))
		}), e.ajx(e.getReq().ser + "/adPlan/getHomePageInfo.action", {}, function(t) {
			if ("0" === t.infocode) {
				var o = t.info.topMap.searchTextList,
					n = t.info.bannerMap.bannerTabList,
					a = t.info.topMap.topList;
				for (var s in o) o[s].pictureUrl && i("#index_header_hotsearch").append('<a href="javascript:;">' + o[s].pictureUrl + "</a>");
				for (var d in a) a[d].pictureUrl && i("#swiper-wrapper1").append('<li><a href="' + a[d].adLink + '"><img src="' + e.getReq().imgPath + a[d].pictureUrl + '" /></a></li>');
				for (var r in n) {
					var c = "/" === location.pathname ? "/index.html" : location.pathname;
					n[r].pictureUrl && i("#index_header_nav").append('<li  class="' + (n[r].adLink.indexOf(c) > -1 ? "cur" : "") + '"><a href="' + n[r].adLink + '">' + n[r].pictureUrl + "</a></li>")
				}
			}
		}), e.ajx(e.getReq().ser + "adPlan/getAdPlanInfoAll.action?mapValue=183-b", {}, function(e) {
			"0" === e.infocode && (i("input#index_header_search_text").attr("placeholder", e.info["183_b"][0].remark_adS), i("input#index_header_search_text").attr("data-url", e.info["183_b"][0].adLink))
		}), i("#index_header_hotsearch").on("click", "a", function() {
			location.href = "/list/search.html?key=" + i(this).html()
		});
		var d = {
			firmetu: e.getReq().ser + "/goodsClass/getClassInfoMember.action",
			twometu: e.getReq().ser + "/goodsClass/getClassInfoMemberAll.action",
			init: function() {
				this.show_hide(), this.show_list(), this.showhis()
			},
			showhis: function() {
				var e = window.location.pathname;
				"/" == e || "/index.html" == e || (i(".Ui_fir").hide(), i(".fenl").after('<li class=""><a href="/">首页</a></li>'))
			},
			show_list: function() {
				var t = this;
				e.ajx(t.firmetu, {
					memberId: 1
				}, function(e) {
					if ("0" === e.infocode) {
						var t = e.info.list_goodsClass,
							o = 438 / 13,
							n = "";
						t.forEach(function(i, e) {
							n += '<a class="ui-list-fir" href="javascript:void(0);" style="line-height:' + o + 'px" data-classId="' + i.classId + '">' + i.className + '</a><div class="ui-list-two"></div>'
						}), i(".Ui_fir").append(n)
					}
				}, function() {
					alert("请求失败")
				})
			},
			show_hide: function() {
				var t = this;
				i(".Ui_fir").on("mouseenter", ".ui-list-fir", function(o) {
					i(".ui-list-two").hide(), i(this).css({
						background: "rgba(154,42,42,0.6)"
					}).siblings(".ui-list-fir").css({
						background: ""
					});
					var n = i(this).index() / 2,
						a = i(this).data("classid"),
						s = Boolean(i(".ui-list-two").eq(n).text());
					s ? i(".ui-list-two").eq(n).show() : e.ajx(t.twometu, {
						memberId: 1,
						classId: a
					}, function(e) {
						if ("0" === e.infocode) {
							var t = e.info.list_goodsClass,
								o = "";
							t.forEach(function(i, e) {
								o += '<dl><dt><a href="/list/sort.html?sId=' + i.classId + '">' + i.className + "</a></dt><dd>", i.classTwo.forEach(function(i, e) {
									o += '<a href="/list/sort.html?sId=' + i.classId + '">' + i.className + "</a>"
								}), o += "</dd></dl>"
							}), i(".ui-list-two").eq(n).show(), i(".ui-list-two").eq(n).html(o)
						}
					}, function() {
						alert("请求失败")
					})
				}), i(".Ui_fir").on("mouseleave", ".ui-list-two", function() {
					i(this).hide(), i(".ui-list-fir").css({
						background: ""
					})
				}), i(".Ui_fir").on("mouseleave", function() {
					i(".ui-list-two").hide(), i(".ui-list-fir").css({
						background: ""
					})
				})
			}
		};
		d.init()
	})
}), define("index_header", function() {}), requirejs.config({
	baseUrl: "/js/lib",
	urlArgs: "v0.0.1"
}), require(["lib", "index_header"], function(i) {
	i = new i;
	var e = {
		activeList: ["normalList", "bindList", "priceReduceList", "manJianList", "flashList", "buyGiftList"],
		goodsId: 0,
		isEmpty: !0,
		delOp: -1,
		init: function() {
			var i = this;
			i.initPage(), i.bindEvent(), i.fixButton()
		},
		bindEvent: function() {
			var e = this;
			$(document).on("click", ".ui-choose-all:not(.ui-dis)", function() {
				$(this).addClass("ui-dis"), $(this).hasClass("active") ? ($(".ui-choose-all").removeClass("active"), e.initPage("shoppingCart/clearOpt.action")) : ($(".ui-choose-all").addClass("active"), e.initPage("shoppingCart/updateAllOpt.action"))
			}), $(document).on("click", ".ui-shop-name em:not(.ui-dis)", function() {
				$(this).addClass("ui-dis"), $(this).hasClass("active") ? $(this).removeClass("active") : $(this).addClass("active"), e.initPage("shoppingCart/updateAllOptForOneSeller.action", {
					sellerId: $(this).parents(".ui-per-goods").attr("data-shopId"),
					sign: $(this).hasClass("active") ? 1 : 0
				})
			}), $(document).on("click", ".ui-goods-info em:not(.ui-dis)", function() {
				$(this).addClass("ui-dis"), $(this).hasClass("active") ? $(this).removeClass("active") : $(this).addClass("active"), e.goodsId = $(this).parent().attr("data-goodsId"), e.initPage("shoppingCart/updateOpt.action", {
					goodsId: $(this).parent().attr("data-goodsId")
				})
			}), $(document).on("click", ".ui-reduce:not(.ui-dis)", function() {
				$(this).addClass("ui-dis");
				var i = Number($(this).next().children().val());
				i <= 1 || (i--, e.goodsId = $(this).parent().attr("data-goodsId"), e.initPage("shoppingCart/updateNum.action", {
					goodsId: $(this).parent().attr("data-goodsId"),
					goodsNum: i
				}))
			}), $(document).on("click", ".ui-add:not(.ui-dis)", function() {
				$(this).addClass("ui-dis");
				var i = Number($(this).prev().children().val());
				i >= 99 || (i++, e.goodsId = $(this).parent().attr("data-goodsId"), e.initPage("shoppingCart/updateNum.action", {
					goodsId: $(this).parent().attr("data-goodsId"),
					goodsNum: i
				}))
			}), $(document).on("blur", ".ui-input-num input", function() {
				var i = Number($(this).val());
				isNaN(i) || i < 1 ? i = 1 : i > 99 && (i = 99), e.goodsId = $(this).parent().parent().attr("data-goodsId"), e.initPage("shoppingCart/updateNum.action", {
					goodsId: $(this).parent().parent().attr("data-goodsId"),
					goodsNum: i
				})
			}), $(document).on("click", ".ui-g-do > p.ui-op-del", function() {
				$(".ui-tan-t").html('删除商品<em class="ui-close"></em>'), $(".ui-tan-ts > div:eq(0)").text("主人，您确定删除该商品吗？"), e.delOp = 0, e.goodsId = $(this).parent().attr("data-goodsId"), $(".ui-tan").show()
			}), $(document).on("click", ".ui-g-do > p.ui-op-coll", function() {
				e.saveGoodsCollect($(this).parent().attr("data-goodsId"), this)
			}), $(document).on("click", ".ui-del-choosed", function() {
				$(".ui-tan-t").html('删除选中商品<em class="ui-close"></em>'), $(".ui-tan-ts > div:eq(0)").text("主人，您确定删除选中的商品吗？"), e.delOp = 1, $(".ui-tan").show()
			}), $(document).on("click", ".ui-go-pay:not(.ui-dis)", function() {
				$(".spinner").css("display", "block"), $(this).addClass("ui-dis"), i.ajx(i.getReq().ser + "shoppingCart/toBalance.action", {}, function(e) {
					"0" === e.infocode ? location.href = "/order/go_order.html" : (alert(e.info), "1" === e.infocode && (location.href = "/member/login.html?backUrl=" + i.getBackUrl())), $(this).removeClass("ui-dis"), $(".spinner").css("display", "none")
				}, e.errorFn)
			}), $(document).on("click", ".ui-tan .ui-close, .ui-no", function() {
				$(".ui-tan").hide()
			}), $(document).on("click", ".ui-yes", function() {
				1 === e.delOp ? e.initPage("shoppingCart/deleteOpt.action") : e.initPage("shoppingCart/deleteOne.action", {
					goodsId: e.goodsId
				}), $(".ui-tan").hide()
			})
		},
		saveGoodsCollect: function(e, t) {
			var o = this;
			i.ajx(i.getReq().ser + "goodsCollect/saveGoodsCollect.action", {
				goodsId: e
			}, function(e) {
				"0" === e.infocode ? ($(t).addClass("ui-wc"), $(t).text("已收藏")) : (alert(e.info), "2" === e.infocode && (location.href = "/member/login.html?backUrl=" + i.getBackUrl()))
			}, o.errorFn)
		},
		initPage: function(e, t) {
			var o = this;
			$(".spinner").css("display", "block"), i.ajx(i.getReq().ser + (e ? e : "/shoppingCart/listCart.action"), t ? t : {}, function(i) {
				o.successFN(i)
			}, o.errorFn)
		},
		successFN: function(e) {
			var t = this;
			if ("0" === e.infocode) {
				var o = "";
				t.noPassList(e.info.noPassList), $(".ui-choose-all").removeClass("active"), $(".ui-total-num").text(e.info.goodsNumTotal), $(".ui-total-price").text("￥" + e.info.goodsPriceTotal), "1" === e.info.isAll && $(".ui-choose-all").addClass("active"), $.each(e.info.sellerInfoList, function(e, n) {
					t.isEmpty = !1, o += '<div class="ui-per-goods" data-shopId="' + n.sellerId + '"> <div class="ui-shop-name"><em class="' + ("1" === n.isAllForOneSeller ? "active" : "") + '"></em>' + n.sellerName + '</div> <div class="ui-goods-show">';
					var a = "";
					0 !== n.sellerId ? ($.each(t.activeList, function(e, t) {
						$.each(n[t], function(e, n) {
							o += '<div class="ui-goods-info" id="ui-goods-' + n.goodsId + '" data-goodsId="' + n.goodsId + '"><em  class="' + (1 === n.isOpt ? "active" : "") + '"></em><ul><li class="ui-g-img"><a href="/item-' + n.goodsId + '.html"><img src="' + i.getReq().imgPath + i.getImgSize(n.goodsImg ? n.goodsImg : "", "B") + '"></a></li><li class="ui-g-name"><a href="/item-' + n.goodsId + '.html">' + n.goodsName + '</a></li><li class="ui-g-price">￥' + n.btcPrice + '</li><li class="ui-g-num"><div data-goodsId="' + n.goodsId + '"><div class="ui-reduce">-</div><div class="ui-input-num"><input value="' + n.goodsNum + '"/></div><div class="ui-add">+</div></div><div class="ui-tishi"></div></li><li class="ui-g-total-price">￥' + n.subtotal + '</li><li class="ui-g-do"  data-goodsId="' + n.goodsId + '"><p class="ui-op-del">删除</p><p class="ui-op-coll ' + (1 === n.isCollect ? "ui-wc" : "") + '">' + (1 === n.isCollect ? "已收藏" : "收藏") + '</p></li></ul><p class="ui-hb-s">' + (Number(n.limitcoupon) ? "红包抵用" + n.limitcoupon + "元" : "") + "</p></div>", "buyGiftList" === t && n.buyGiftItemList.length > 0 ? $.each(n.buyGiftItemList, function(i, e) {
								o += '<div class="ui-active"><em></em><a href="/item-' + e.freeId + '.html">' + e.freeName + "  x" + e.freeNum + "</a></div>"
							}) : "manJianList" === t && 1 == n.isReach && (o += '<div class="ui-active ui-manjian"><em></em>' + n.activeName + "</div>")
						})
					}), o += a) : ($.each(n.manJianList, function(e, t) {
						$.each(t.goodsList, function(e, t) {
							o += '<div class="ui-goods-info" id="ui-goods-' + t.goodsId + '" data-goodsId="' + t.goodsId + '"><em  class="' + (1 === t.isOpt ? "active" : "") + '"></em><ul><li class="ui-g-img"><a href="/item-' + t.goodsId + '.html"><img src="' + i.getReq().imgPath + i.getImgSize(t.goodsImg ? t.goodsImg : "", "B") + '"></a></li><li class="ui-g-name"><a href="/item-' + t.goodsId + '.html">' + t.goodsName + '</a></li><li class="ui-g-price">￥' + t.btcPrice + '</li><li class="ui-g-num"><div data-goodsId="' + t.goodsId + '"><div class="ui-reduce">-</div><div class="ui-input-num"><input value="' + t.goodsNum + '"/></div><div class="ui-add">+</div></div><div class="ui-tishi"></div></li><li class="ui-g-total-price">￥' + t.subtotal + '</li><li class="ui-g-do"  data-goodsId="' + t.goodsId + '"><p class="ui-op-del">删除</p><p class="ui-op-coll ' + (1 === t.isCollect ? "ui-wc" : "") + '">' + (1 === t.isCollect ? "已收藏" : "收藏") + '</p></li></ul><p class="ui-hb-s">' + (Number(t.limitcoupon) ? "红包抵用" + t.limitcoupon + "元" : "") + "</p></div>"
						}), 1 == t.isReach && (a += '<div class="ui-active ui-manjian"><em></em>' + t.desc + "</div>")
					}), o += a), o += "</div></div></div>"
				}), $(".ui-goods-detail").html(o)
			} else "2" === e.infocode ? ($("#ui-goods-" + t.goodsId + " .ui-input-num input").val(e.info), t.initPage("shoppingCart/updateNum.action", {
				goodsId: t.goodsId,
				goodsNum: e.info
			})) : alert(e.info);
			$(".ui-dis").removeClass("ui-dis"), t.isEmpty ? ($(".ui-cart-footer, .ui-goods-list-t").css("display", "none"), $(".ui-nothing-find").css("display", "block")) : ($(".ui-cart-footer, .ui-goods-list-t").css("display", "block"), $(".ui-nothing-find").css("display", "none")), t.isEmpty = !0, $(".spinner").css("display", "none")
		},
		errorFn: function() {
			$(".ui-dis").removeClass("ui-dis"), $(".spinner").css("display", "none")
		},
		noPassList: function(i) {
			setTimeout(function() {
				$.each(i, function(i, e) {
					$("#ui-goods-" + e.goodsId + ".ui-tishi").text(e.desc)
				})
			}, 1e3)
		},
		fixButton: function() {
			document.getElementsByTagName("body")[0].offsetHeight - ($(window).scrollTop() + $(window).height()) < 320 ? $(".ui-cart-footer").css("position", "relative") : $(".ui-cart-footer").css("position", "fixed"), $(window).scroll(function() {
				document.getElementsByTagName("body")[0].offsetHeight - ($(window).scrollTop() + $(window).height()) < 320 ? $(".ui-cart-footer").css("position", "relative") : $(".ui-cart-footer").css("position", "fixed")
			})
		}
	};
	e.init()
}), define("cart", function() {});
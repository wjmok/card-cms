
import axios from '../http.js';
import store from '../../store/index';






var qs = require('qs');












/**
 * 上传图片
 */





export const upimg = (data,config) => axios.post('upload',data,config);



/**
 * 获取菜单层级菜单
 */


export const getMenutree = (data) => axios.post('Menu/GetTree',qs.stringify(data),{
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }, 
            });


/**
 * 编辑菜单信息
 */



export const sendMenuEdit = (data) => axios.post('Menu/Edit',qs.stringify(data),{
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }, 
            });


/**
 * 新增菜单信息
 */



export const sendMenuAdd = (data) => axios.post('Menu/Add',qs.stringify(data),{
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }, 
            });


/**
 * 删除菜单信息
 */



export const sendMenuDel = (data) => axios.post('Menu/Del',qs.stringify(data),{
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }, 
            });

/**
 * 获取菜单列表
 */



export const getMenuList = (data) => axios.post('getMenuList/0',qs.stringify(data),{
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }, 
            });

/**
 * 获取文章列表
 */



export const getArtList = (data) => axios.post('Article/GetList',qs.stringify(data),{
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }, 
            });

/**
 * 更新文章
 */



export const sendEditArt = (data) => axios.post('Article/Edit',qs.stringify(data),{
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }, 
            });


/**
 * 删除文章信息
 */



export const sendArtDel = (data) => axios.post('Article/Del',qs.stringify(data),{
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }, 
            });

/**
 * 添加文章
 */



export const sendArtAdd = (data) => axios.post('Article/Add',qs.stringify(data),{
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }, 
            });





























//获取admin列表


export const getAdminLists = (data) => axios.post('Admin/List',qs.stringify(data),{
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }, 
            });



//编辑admin


export const editAdmin = (data) => axios.post('Admin/Update',qs.stringify(data),{
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }, 
            });

//编辑admin


export const uptPass = (data) => axios.post('Admin/uptPass',qs.stringify(data),{
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }, 
            });


//添加admin


export const addAdmin = (data) => axios.post('Admin/Add',qs.stringify(data),{
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }, 
            });


//删除admin


export const delAdmin = (data) => axios.post('Admin/Del',qs.stringify(data),{
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }, 
            });



//商品类别

export const sendCategoryAdd = (data) => axios.post('Category/Add',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});


export const sendCategoryEdit = (data) => axios.post('Category/Edit',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});

export const sendCategoryDel = (data) => axios.post('Category/Del',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});



export const sendCategoryTree = (data) => axios.post('Category/GetTree',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});


//product


export const sendProductAdd = (data) => axios.post('Product/Add',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});

export const sendProductEdit = (data) => axios.post('Product/Edit',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});

export const sendProductDel = (data) => axios.post('Product/Del',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});


export const sendProductList = (data) => axios.post('Product/Getlist',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});


//remark
//获取指定商品评论
export const sendRemarkList = (data) => axios.post('Remark/getRemark',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});

export const remarkDel = (data) => axios.post('Remark/Del',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});

//Message

export const messageList = (data) => axios.post('Message/getMessageList',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});

export const messageDel = (data) => axios.post('Message/delMessage',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});

export const messageDeal = (data) => axios.post('Message/dealMessage',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});

//订单


export const sendOrderEdit = (data) => axios.post('EditOrder',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});

export const sendOrderDel = (data) => axios.post('DelOrder',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});




export const sendOrderList = (data) => axios.post('getAllOrder',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});


export const sendProductModelAdd = (data) => axios.post('ProductModel/Add',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});

export const sendProductModelDel = (data) => axios.post('ProductModel/Del',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});

export const sendProductModelEdit = (data) => axios.post('ProductModel/Edit',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});

//theme

export const ThemeTree = (data) => axios.post('Theme/GetTree',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});

export const ThemeAdd = (data) => axios.post('Theme/Add',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});

export const ThemeEdit = (data) => axios.post('Theme/Edit',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});

export const ThemeDel = (data) => axios.post('Theme/Del',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});


//themecontent

export const ThemeContentAdd = (data) => axios.post('ThemeContent/Add',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});

export const ThemeContentEdit = (data) => axios.post('ThemeContent/Edit',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});

export const ThemeContentDel = (data) => axios.post('ThemeContent/Del',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});

export const ThemeContentList = (data) => axios.post('ThemeContent/GetList',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});


//member

export const MemberList = (data) => axios.post('Member/GetList',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});

export const MemberEdit = (data) => axios.post('Member/Edit',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});

export const MemberDel = (data) => axios.post('Member/Del',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});



//MemberCard

export const MemberCardList = (data) => axios.post('MemberCard/GetList',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});

export const MemberCardAdd = (data) => axios.post('MemberCard/Add',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});

export const MemberCardEdit = (data) => axios.post('MemberCard/Edit',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});

export const MemberCardDel = (data) => axios.post('MemberCard/Del',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});


//book


export const BookList = (data) => axios.post('Book/GetList',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});

export const BookAdd = (data) => axios.post('Book/Add',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});

export const BookEdit = (data) => axios.post('Book/Edit',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});

export const BookDel = (data) => axios.post('Book/Del',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});


//book_order

export const BookOrderList = (data) => axios.post('BookOrder/GetList',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});
export const BookOrderEdit = (data) => axios.post('BookOrder/Edit',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});
export const BookOrderDel = (data) => axios.post('BookOrder/Del',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});


//coupon
export const CouponList = (data) => axios.post('Coupon/GetList',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});
export const CouponAdd = (data) => axios.post('Coupon/Add',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});
export const CouponEdit = (data) => axios.post('Coupon/Edit',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});
export const CouponDel = (data) => axios.post('Coupon/Del',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});



//user
export const UserList = (data) => axios.post('AdminUser/getList',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});

export const UserEdit = (data) => axios.post('AdminUser/Edit',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});

export const UserAdd = (data) => axios.post('AdminUser/Add',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});
export const UserDel = (data) => axios.post('AdminUser/Del',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});




//CustomerCoupon
export const CustomerCouponList = (data) => axios.post('CustomerCoupon/GetList',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});
export const CustomerCouponEdit = (data) => axios.post('CustomerCoupon/Edit',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});



//CustomerCard

export const CustomerCardList = (data) => axios.post('CustomerCard/GetList',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});

//invitation_menu
export const InvitationMenuTree = (data) => axios.post('InvitationMenu/GetTree',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});
export const InvitationMenuAdd = (data) => axios.post('InvitationMenu/Add',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});
export const InvitationMenuEdit = (data) => axios.post('InvitationMenu/Edit',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});
export const InvitationMenuDel = (data) => axios.post('InvitationMenu/Del',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});



//Invitation
export const InvitationList = (data) => axios.post('Invitation/GetList',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});
export const InvitationAdd = (data) => axios.post('Invitation/Add',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});
export const InvitationEdit = (data) => axios.post('Invitation/Edit',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});
export const InvitationDel = (data) => axios.post('Invitation/Del',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});


//invitation_remark

export const InvitationRemarkList = (data) => axios.post('InvitationRemark/GetList',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});
export const InvitationRemarkDel = (data) => axios.post('InvitationRemark/Del',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});



export const scoreAdd = (data) => axios.post('FlowScore/Add',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});
export const scoreList = (data) => axios.post('FlowScore/GetList',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});
export const scoreCheck = (data) => axios.post('FlowScore/Check',qs.stringify(data),{
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }, 
});













